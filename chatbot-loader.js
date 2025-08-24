// Execute immediately instead of waiting for DOMContentLoaded
(function() {
  // Create link element for chatbot CSS with relative path
  const chatbotCssLink = document.createElement('link');
  chatbotCssLink.rel = 'stylesheet';
  chatbotCssLink.href = 'chatbot/chatbot.css';
  document.head.appendChild(chatbotCssLink);

  // Create link for Font Awesome if not already present
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
  }

  // Create chatbot HTML structure
  const chatbotHTML = `
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-header-title">
          <i class="fas fa-robot"></i>
          <h2>AI Assistant</h2>
        </div>
        <button id="chat-toggle" class="chat-toggle">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="chat-body">
        <div class="chat-messages" id="chat-messages">
          <div class="message bot-message">
            <div class="message-content">
              <p>Hello! I'm your AI assistant. How can I help you today?</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <input type="text" id="user-input" placeholder="Type your message here..." autocomplete="off">
        <button id="send-btn">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>

    <button class="chat-button" id="chat-button">
      <i class="fas fa-comment"></i>
    </button>
  `;

  // Create container for chatbot
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'chatbot-container';
  chatbotContainer.innerHTML = chatbotHTML;
  document.body.appendChild(chatbotContainer);

  // Load chatbot JavaScript
  const chatbotScript = document.createElement('script');
  chatbotScript.src = './chatbot/chatbot.js';
  document.body.appendChild(chatbotScript);
})();