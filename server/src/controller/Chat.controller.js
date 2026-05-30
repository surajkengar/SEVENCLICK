import Groq from "groq-sdk";
import Chat from "../models/Chat.js";
import dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY ,
});

const SYSTEM_PROMPT =
  "You are a supply optimization AI assistant for SevenClick, a crypto, forex and stocks trading platform. Help users with cryptocurrency platforms, trading supply chains, order routing, liquidity, and market opportunities. Keep responses concise, practical and friendly.";

// ── GET /api/v1/chat/getchathistory ────────────────────
export const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ user: req.user.id });

    if (!chat) {
      return res.status(200).json({
        success: true,
        message: [],
        totalmessage: 0,
      });
    }

    return res.status(200).json({
      success: true,
      message: chat.message,
      totalmessage: chat.totalmessage,
    });

  } catch (error) {
    console.log("getChatHistory error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get chat history",
    });
  }
};

// ── POST /api/v1/chat/sendmessage ──────────────────────
export const sendMessage = async (req, res) => {
  try {
    const { content } = req.body;

    // validate
    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    // find or create chat for this user
    let chat = await Chat.findOne({ user: req.user.id });

    if (!chat) {
      chat = await Chat.create({
        user: req.user.id,
        services: "supply",
        message: [],
        totalmessage: 0,
      });
    }

    // push user message
    chat.message.push({
      role: "user",
      content: content.trim(),
    });

    // build Groq message history
    // Groq uses same format as OpenAI — role: "user" | "assistant"
    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chat.message.map((msg) => ({
        role: msg.role,         // "user" or "assistant" — same as our DB
        content: msg.content,
      })),
    ];

    // call Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",  // free, fast model on Groq
      messages: groqMessages,
      max_tokens: 1024,
    });

    // extract AI reply
    const aiReply = completion.choices[0].message.content;

    // push AI reply
    chat.message.push({
      role: "assistant",
      content: aiReply,
    });

    // update total message count
    chat.totalmessage = chat.message.length;

    await chat.save();

    return res.status(200).json({
      success: true,
      userMessage: { role: "user",      content: content.trim() },
      aiMessage:   { role: "assistant", content: aiReply },
      totalmessage: chat.totalmessage,
    });

  } catch (error) {
    console.log("sendMessage error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

// ── DELETE /api/v1/chat/clearchat ─────────────────────
export const clearChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ user: req.user.id });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "No chat found",
      });
    }

    chat.message = [];
    chat.totalmessage = 0;
    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Chat cleared successfully",
    });

  } catch (error) {
    console.log("clearChat error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear chat",
    });
  }
};