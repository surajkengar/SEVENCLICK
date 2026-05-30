
function Articlesection(){
    return (
    <section id="article" className="article-section">
        <div className="article-container">
            <h2>Latest Article</h2>
            <p className="article-description">
                Explorer our latest , insight , strategies and Learning resources
            </p>

            <div className="article-grid">
                <div className="article-card">
                    <img 
                        src="https://images.unsplash.com/photo-1640161704729-cbe966a08476" 
                        alt="article" 
                    />

                    <h3>Understanding market trends</h3>
                    <p>Learn how learn and Analyze market trends effectively</p>
                </div>

                <div className="article-card">
                    <img 
                        src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e"
                        alt="article" 
                    />

                    <h3>Risk Management </h3>
                    <p>understand how minimize risk in trading </p>
                </div>

                <div className="article-card">
                    <img
                         src="https://images.unsplash.com/photo-1559526324-593bc073d938"
                         alt="article" 
                    />

                    <h3>smart treding strategis</h3>
                    <p>improve your trading decision with proven method</p>
                </div>
            </div>

        </div>
    </section>
    )
}

export default Articlesection;