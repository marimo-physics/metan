// 跳ね返る水玉のアニメーション
class BouncingDot {
    constructor(container, id) {
        this.container = container;
        this.id = id;
        this.element = document.createElement('div');
        this.element.className = 'bouncing-dot';
        
        // 初期設定
        this.size = 10 + Math.random() * 15;
        this.opacity = 0.15 + Math.random() * 0.25;
        
        // 初期位置（端から少し離れた場所）
        this.x = this.size + Math.random() * (window.innerWidth - this.size * 2);
        this.y = this.size + Math.random() * (window.innerHeight - this.size * 2);
        
        // 速度（ランダム方向）
        const speed = 0.5 + Math.random() * 1.5;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.element.style.cssText = `
            position: fixed;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            background: rgba(255, 255, 255, ${this.opacity});
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        
        this.container.appendChild(this.element);
    }
    
    update() {
        // 位置を更新
        this.x += this.vx;
        this.y += this.vy;
        
        // 壁との衝突判定と跳ね返り
        if (this.x <= 0 || this.x >= window.innerWidth - this.size) {
            this.vx = -this.vx;
            this.x = Math.max(0, Math.min(window.innerWidth - this.size, this.x));
        }
        
        if (this.y <= 0 || this.y >= window.innerHeight - this.size) {
            this.vy = -this.vy;
            this.y = Math.max(0, Math.min(window.innerHeight - this.size, this.y));
        }
        
        // 要素の位置を更新
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}

// 跳ね返る水玉を作成
function createBouncingDots() {
    const cloudBg = document.querySelector('.cloud-bg');
    const dots = [];
    const dotCount = 45;
    
    // 水玉を作成
    for (let i = 0; i < dotCount; i++) {
        dots.push(new BouncingDot(cloudBg, i));
    }
    
    // アニメーションループ
    function animate() {
        dots.forEach(dot => dot.update());
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // ウィンドウサイズ変更時の対応
    window.addEventListener('resize', () => {
        dots.forEach(dot => {
            // 画面外に出た水玉を画面内に戻す
            if (dot.x > window.innerWidth - dot.size) {
                dot.x = window.innerWidth - dot.size;
                dot.vx = -Math.abs(dot.vx);
            }
            if (dot.y > window.innerHeight - dot.size) {
                dot.y = window.innerHeight - dot.size;
                dot.vy = -Math.abs(dot.vy);
            }
        });
    });
}

// スムーススクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // 跳ね返る水玉のアニメーションを初期化
    createBouncingDots();
    // ナビゲーションリンクのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // スクロール時のヘッダー効果
    const header = document.querySelector('.header');
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.transform = 'translateY(-20px)';
            navigation.style.background = 'rgba(255, 255, 255, 0.95)';
            navigation.style.boxShadow = '0 4px 20px rgba(217, 237, 255, 0.4)';
        } else {
            header.style.transform = 'translateY(0)';
            navigation.style.background = 'rgba(255, 255, 255, 0.8)';
            navigation.style.boxShadow = '0 2px 10px rgba(217, 237, 255, 0.2)';
        }
    });

    // ギャラリー画像のクリック効果
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // 簡単なモーダル効果（オプション）
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // 要素のフェードイン効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 観察対象の要素を設定
    const animatedElements = document.querySelectorAll('.profile-card, .gallery-item, .activity-card, .support-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // タイピング効果
    const tagline = document.querySelector('.tagline');
    const originalText = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            tagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 1000);
});

// 応援メッセージ送信機能
function sendMessage() {
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const messageList = document.getElementById('messageList');
    
    const name = nameInput.value.trim() || '匿名';
    const message = messageInput.value.trim();
    
    if (message === '') {
        showNotification('メッセージを入力してください', 'error');
        return;
    }
    
    // 新しいメッセージ要素を作成
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.style.opacity = '0';
    messageItem.style.transform = 'translateY(20px)';
    messageItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    messageItem.innerHTML = `
        <div class="message-author">${escapeHtml(name)}</div>
        <div class="message-content">${escapeHtml(message)}</div>
    `;
    
    // メッセージリストの先頭に追加
    messageList.insertBefore(messageItem, messageList.firstChild);
    
    // アニメーション
    setTimeout(() => {
        messageItem.style.opacity = '1';
        messageItem.style.transform = 'translateY(0)';
    }, 100);
    
    // フォームをリセット
    nameInput.value = '';
    messageInput.value = '';
    
    // 成功通知
    showNotification('メッセージを送信しました！', 'success');
    
    // ハート効果
    createHeartEffect();
}

// HTML文字エスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 通知表示機能
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #8BC34A)' : 'linear-gradient(45deg, #F44336, #FF9800)'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ハート効果
function createHeartEffect() {
    const colors = ['💙', '💛', '💚'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = colors[Math.floor(Math.random() * colors.length)];
            heart.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                font-size: 2rem;
                z-index: 999;
                pointer-events: none;
                transform: translate(-50%, -50%);
                animation: heartFloat 2s ease-out forwards;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes heartFloat {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: translate(-50%, -150px) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -250px) scale(0.5);
                        opacity: 0;
                    }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    document.body.removeChild(heart);
                }
                if (style.parentNode) {
                    document.head.removeChild(style);
                }
            }, 2000);
        }, i * 200);
    }
}

// パララックス効果は削除（跳ね返るアニメーションには不要）

// ページ読み込み完了時のアニメーション
window.addEventListener('load', function() {
    const title = document.querySelector('.title-main');
    title.style.animation = 'bounce 1s ease-out';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0,0,0);
            }
            40%, 43% {
                transform: translate3d(0, -10px, 0);
            }
            70% {
                transform: translate3d(0, -5px, 0);
            }
            90% {
                transform: translate3d(0, -2px, 0);
            }
        }
    `;
    document.head.appendChild(style);
});