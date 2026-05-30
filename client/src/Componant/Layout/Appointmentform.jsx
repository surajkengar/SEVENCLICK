import "./index.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bookAppointment } from "../../api/DashboardApi";
import toast from "react-hot-toast";

function Appointmentform({ service }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [booked, setBooked]   = useState(false);

  const [formData, setFormData] = useState({
    service:  service,
    fullname: user?.fullname || "",
    emailid:  user?.emailid  || "",
    mobileno: user?.mobileno || "",
    date:     "",
    timeslot: "",
    note:     "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await bookAppointment(formData);
      if (res.data.success) {
        toast.success("Appointment booked successfully!");
        setBooked(true); //  show success state
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleBookAnother() {
    //  reset all fields to empty — not prefilled
    setFormData({
      service,
      fullname: "",
      emailid:  "",
      mobileno: "",
      date:     "",
      timeslot: "",
      note:     "",
    });
    setBooked(false);
  }

  // ── Success state ──────────────────────────────────
  if (booked) {
    return (
      <div className="form-card success-card">
        <div className="success-icon">✓</div>
        <h3>Appointment Confirmed!</h3>
        <p>We'll get back to you shortly.</p>
        <button className="book-btn" onClick={handleBookAnother}>
          Book Another
        </button>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Book an Appointment</h3>

      <div className="form-row">
        <input
          type="text"
          name="fullname"
          placeholder="Your full name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="emailid"
          placeholder="Email"
          value={formData.emailid}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <input
          type="tel"
          name="mobileno"
          placeholder="Mobile number"
          value={formData.mobileno}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />
        <select
          name="timeslot"
          value={formData.timeslot}
          onChange={handleChange}
          required
        >
          <option value="">Select time</option>
          <option value="9:00 AM">9:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="4:00 PM">4:00 PM</option>
        </select>
      </div>

      <textarea
        name="note"
        placeholder="What would you like to discuss? (optional)"
        value={formData.note}
        onChange={handleChange}
        rows={4}
      />

      <button type="submit" className="book-btn" disabled={loading}>
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>
    </form>
  );
}

export default Appointmentform;