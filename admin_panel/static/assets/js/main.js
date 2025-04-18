// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button and user dropdown elements
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');
    
    // Get theme option elements
    const systemThemeOption = document.getElementById('systemThemeOption');
    const lightThemeOption = document.getElementById('lightThemeOption');
    const darkThemeOption = document.getElementById('darkThemeOption');
    const themeSystem = document.getElementById('themeSystem');
    const themeLight = document.getElementById('themeLight');
    const themeDark = document.getElementById('themeDark');
    
    // Toggle dropdown when avatar is clicked
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (userDropdown && !userDropdown.contains(e.target) && e.target !== userAvatar) {
            userDropdown.classList.remove('active');
        }
    });
    
    // Theme selection handling
    function setTheme(theme) {
        if (theme === 'system') {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
            localStorage.setItem('theme', 'system');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
        
        // Update active class on theme options
        updateActiveThemeOption(theme);
    }
    
    // Update active class on theme options
    function updateActiveThemeOption(theme) {
        if (systemThemeOption && lightThemeOption && darkThemeOption) {
            systemThemeOption.classList.remove('active');
            lightThemeOption.classList.remove('active');
            darkThemeOption.classList.remove('active');
            
            if (theme === 'system') {
                systemThemeOption.classList.add('active');
            } else if (theme === 'light') {
                lightThemeOption.classList.add('active');
            } else if (theme === 'dark') {
                darkThemeOption.classList.add('active');
            }
        }
    }
    
    // Set initial theme based on saved preference
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    
    // Add click event listeners to theme option containers
    if (systemThemeOption && lightThemeOption && darkThemeOption) {
        systemThemeOption.addEventListener('click', function() {
            themeSystem.checked = true;
            setTheme('system');
        });
        
        lightThemeOption.addEventListener('click', function() {
            themeLight.checked = true;
            setTheme('light');
        });
        
        darkThemeOption.addEventListener('click', function() {
            themeDark.checked = true;
            setTheme('dark');
        });
    }
    
    // Also keep the radio button event listeners for direct interaction
    if (themeSystem && themeLight && themeDark) {
        themeSystem.addEventListener('change', function() {
            if (this.checked) setTheme('system');
        });
        
        themeLight.addEventListener('change', function() {
            if (this.checked) setTheme('light');
        });
        
        themeDark.addEventListener('change', function() {
            if (this.checked) setTheme('dark');
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (localStorage.getItem('theme') === 'system') {
            setTheme('system');
        }
    });
    
    // Handle sidebar toggle for mobile
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }
    
    // Handle collapsible sidebar items
    const collapsibleItems = document.querySelectorAll('.nav-item.collapsible');
    
    collapsibleItems.forEach(item => {
        const header = item.querySelector('.nav-header');
        
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});

// Call initializeCopyButtons when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCopyButtons();
});

function clickHandler(event) {
    if (!event.target.closest('.checkbox-cell')) {
        window.location.href = event.currentTarget.getAttribute('data-link');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerMenu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    hamburgerBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});

// Add this function for toast notifications
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create and show new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger reflow and add show class
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add this new function to show a selectable URL when copy fails
function showSelectableUrl(url) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.url-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'url-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'url-modal-content';
    
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.value = url;
    urlInput.readOnly = true;
    urlInput.className = 'url-input';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'إغلاق';
    closeButton.className = 'modal-close-btn';
    
    modalContent.appendChild(urlInput);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Select the URL text
    urlInput.focus();
    urlInput.select();

    // Close modal on button click or outside click
    closeButton.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

function executeBulkAction() {
    const bulkActionForm = document.getElementById('bulkActionForm');
    if (!bulkActionForm) {
        console.error('Bulk action form not found');
        return;
    }

    const selectedCheckboxes = document.querySelectorAll('.row-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.value);
    const action = document.getElementById('bulkAction').value;

    if (selectedIds.length === 0) {
        alert('الرجاء اختيار عنصر واحد على الأقل');
        return;
    }

    if (!action) {
        alert('الرجاء اختيار إجراء');
        return;
    }

    if (action === 'delete' && !confirm('هل أنت متأكد من حذف العناصر المحددة؟')) {
        return;
    }

    document.getElementById('selectedIds').value = JSON.stringify(selectedIds);
    document.getElementById('selectedAction').value = action;
    bulkActionForm.submit();
}

// Initialize bulk action functionality
document.addEventListener('DOMContentLoaded', function() {
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.row-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = this.checked);
        });
    }

    // Initialize row checkboxes
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(rowCheckboxes).every(cb => cb.checked);
            if (selectAll) {
                selectAll.checked = allChecked;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Handle collapsible sections
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(item => {
        const header = item.querySelector('.nav-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Get current URL path
    const currentPath = window.location.pathname;

    // Handle all nav items (both main items and sub-items)
    const allNavItems = document.querySelectorAll('.nav-item a');
    allNavItems.forEach(item => {
        if (item.getAttribute('href') === currentPath) {
            // Add active class to the nav header
            const navHeader = item.querySelector('.nav-header');
            if (navHeader) {
                navHeader.classList.add('active');
            }
            
            // If it's a sub-item
            if (item.classList.contains('sub-item')) {
                item.classList.add('active');
                // Expand parent collapsible
                const parentCollapsible = item.closest('.collapsible');
                if (parentCollapsible) {
                    parentCollapsible.classList.add('active');
                }
            }
        }
    });
});

// Password visibility toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    });
});

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleButton = document.querySelector('.password-toggle-btn i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.classList.remove('fa-eye');
        toggleButton.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleButton.classList.remove('fa-eye-slash');
        toggleButton.classList.add('fa-eye');
    }
}

// Chat WebSocket functionality
let currentChatSocket = null;

class ChatWebSocket {
    constructor(chatId, userName) {
        this.chatId = chatId;
        this.userName = userName;
        this.socket = null;
        this.messageContainer = document.querySelector('.messages-container');
        this.chatInput = document.querySelector('.chat-input input');
        this.sendButton = document.querySelector('.send-button');
        this.currentPage = 1;
        this.isLoading = false;
        this.hasMoreMessages = true;
        this.setupWebSocket();
        this.setupEventListeners();
    }

    setupWebSocket() {
        // Close existing socket if any
        if (currentChatSocket && currentChatSocket.socket) {
            currentChatSocket.socket.close();
        }

        this.socket = new WebSocket(`ws://145.223.80.125:8080/ws/chat/${this.chatId}/`);
        currentChatSocket = this;
        
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            // Request initial messages
            this.loadMessages();
            // Update UI to show connection status
            this.updateConnectionStatus(true);
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'chat_message') {
                this.displayMessage(data, true);
            } else if (data.type === 'message_history') {
                this.handleMessageHistory(data.messages, data.has_more);
            }
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
            this.updateConnectionStatus(false);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.updateConnectionStatus(false);
        };
    }

    updateConnectionStatus(connected) {
        const statusElement = document.querySelector('.status');
        if (statusElement) {
            statusElement.textContent = connected ? 'متصل' : 'غير متصل';
            statusElement.classList.toggle('online', connected);
        }
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Add scroll event listener for infinite scroll
        this.messageContainer.addEventListener('scroll', () => {
            if (this.shouldLoadMoreMessages()) {
                this.loadMessages();
            }
        });
    }

    shouldLoadMoreMessages() {
        if (this.isLoading || !this.hasMoreMessages) return false;
        
        const scrollTop = this.messageContainer.scrollTop;
        // Load more when user scrolls near the top (100px threshold)
        return scrollTop < 100;
    }

    loadMessages() {
        if (this.isLoading || !this.hasMoreMessages) return;
        
        this.isLoading = true;
        this.socket.send(JSON.stringify({
            'type': 'fetch_messages',
            'page': this.currentPage,
            'page_size': 20
        }));
    }

    handleMessageHistory(messages, hasMore) {
        const initialHeight = this.messageContainer.scrollHeight;
        const wasEmpty = this.messageContainer.children.length === 0;
        
        // Display messages at the top
        const fragment = document.createDocumentFragment();
        messages.reverse().forEach(message => {
            const messageElement = this.createMessageElement(message);
            fragment.appendChild(messageElement);
        });
        
        // Prepend messages if not the first load
        if (!wasEmpty) {
            this.messageContainer.insertBefore(fragment, this.messageContainer.firstChild);
            // Maintain scroll position
            const newHeight = this.messageContainer.scrollHeight;
            this.messageContainer.scrollTop = newHeight - initialHeight;
        } else {
            this.messageContainer.appendChild(fragment);
            this.scrollToBottom();
        }

        this.hasMoreMessages = hasMore;
        this.currentPage++;
        this.isLoading = false;
    }

    createMessageElement(data) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${data.sender == 1 ? 'sent' : 'received'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = data.message;
        
        messageContent.appendChild(messageText);
        messageDiv.appendChild(messageContent);

        return messageDiv;
    }

    displayMessage(data, isNew = false) {
        const messageElement = this.createMessageElement(data);
        
        if (isNew) {
            this.messageContainer.appendChild(messageElement);
            this.scrollToBottom();
        } else {
            this.messageContainer.insertBefore(messageElement, this.messageContainer.firstChild);
        }
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                'type': 'chat_message',
                'message': message
            }));
            this.chatInput.value = '';
        }
    }

    scrollToBottom() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
}

// Function to handle chat selection
function selectChat(element, chatId, userName) {
    // Update active chat styling
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');

    // Update chat header
    const chatHeader = document.querySelector('.current-chat-info h3');
    if (chatHeader) {
        chatHeader.textContent = userName;
    }

    // Initialize new WebSocket connection for selected chat
    new ChatWebSocket(chatId, userName);
}

// Initialize chat functionality when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
        // Find first chat and select it if exists
        const firstChat = document.querySelector('.chat-item');
        if (firstChat) {
            const chatId = firstChat.getAttribute('data-chat-id');
            const userName = firstChat.querySelector('.chat-info h4').textContent;
            selectChat(firstChat, chatId, userName);
        }
    }
});