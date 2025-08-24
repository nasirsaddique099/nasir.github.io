// Execute immediately instead of waiting for DOMContentLoaded
(function() {
  // Wait a short time to ensure elements are loaded
  setTimeout(function() {
    // DOM Elements
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.querySelector('.chat-container');
    const chatToggle = document.getElementById('chat-toggle');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-btn');
    
    if (!chatButton || !chatContainer || !chatToggle || !chatMessages || !userInput || !sendButton) {
      console.error('Chatbot elements not found:', {
        chatButton, chatContainer, chatToggle, chatMessages, userInput, sendButton
      });
      return;
    }

    // Chat toggle functionality
    chatButton.addEventListener('click', function() {
      chatContainer.classList.add('active');
      chatButton.style.display = 'none';
      // Scroll to the bottom of the chat
      scrollToBottom();
    });

    chatToggle.addEventListener('click', function() {
      chatContainer.classList.remove('active');
      chatButton.style.display = 'flex';
    });

    // Send message functionality
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    function sendMessage() {
      const message = userInput.value.trim();
      if (message === '') return;

      // Add user message to chat
      addMessage(message, 'user');
      userInput.value = '';

      // Show typing indicator
      showTypingIndicator();

      // Process the message and get a response (with a delay to simulate thinking)
      setTimeout(() => {
        const response = processMessage(message);
        removeTypingIndicator();
        addMessage(response, 'bot');
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    function addMessage(message, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', `${sender}-message`);
      
      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      
      const messageParagraph = document.createElement('p');
      messageParagraph.textContent = message;
      
      messageContent.appendChild(messageParagraph);
      messageDiv.appendChild(messageContent);
      chatMessages.appendChild(messageDiv);
      
      // Scroll to the bottom
      scrollToBottom();
    }

    function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.classList.add('message', 'bot-message', 'typing-message');
      typingDiv.innerHTML = `
        <div class="message-content">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;
      chatMessages.appendChild(typingDiv);
      scrollToBottom();
    }

    function removeTypingIndicator() {
      const typingMessage = document.querySelector('.typing-message');
      if (typingMessage) {
        typingMessage.remove();
      }
    }

    function scrollToBottom() {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Simple message processing function
    function processMessage(message) {
      message = message.toLowerCase();
      
      // Simple responses based on keywords
      if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return 'Hello! How can I help you today?';
      } else if (message.includes('how are you')) {
        return 'I\'m just a bot, but I\'m functioning well! How can I assist you?';
      } else if (message.includes('bye') || message.includes('goodbye')) {
        return 'Goodbye! Feel free to come back if you have more questions.';
      } else if (message.includes('thank')) {
        return 'You\'re welcome! Is there anything else I can help with?';
      } else if (message.includes('help')) {
        return 'I can help answer questions about our website, products, or services. What would you like to know?';
      } else if (message.includes('contact') || message.includes('support')) {
        return 'You can contact our support team through the Contact page or by emailing support@example.com.';
      } else if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
        return 'Our pricing information can be found on the Pricing page. We offer various plans to suit different needs.';
      } else if (message.includes('feature') || message.includes('what can you do')) {
        return 'I can answer questions, provide information about our services, and help you navigate our website.';
      } else if (message.includes('blog') || message.includes('article')) {
        return 'Check out our blog section for the latest articles and updates!';
      } else if (message.includes('account') || message.includes('login') || message.includes('sign')) {
        return 'You can create an account or log in using the links in the top navigation bar.';
      } else {
        // Default responses (randomly selected)
        const defaultResponses = [
          'I\'m not sure I understand. Could you please rephrase that?',
          'That\'s an interesting question. Let me think about how to help you best.',
          'I don\'t have specific information about that yet. Is there something else I can help with?',
          'I\'m still learning! Could you try asking in a different way?',
          'I\'m not programmed to answer that specific question yet. Is there something else you\'d like to know?'
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }
    }
  }, 500); // Wait 500ms for DOM to be fully ready
})();