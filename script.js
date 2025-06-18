
        const amountBtns = document.querySelectorAll('.amount-btn');
        const customAmountInput = document.getElementById('customAmount');
        let selectedAmount = null;

        amountBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                amountBtns.forEach(b => b.classList.remove('active'));
                
                btn.classList.add('active');
                
                const amount = btn.dataset.amount;
                
                if (amount === 'custom') {
                    customAmountInput.style.display = 'block';
                    customAmountInput.focus();
                    selectedAmount = null;
                } else {
                    customAmountInput.style.display = 'none';
                    selectedAmount = amount;
                }
            });
        });

        customAmountInput.addEventListener('input', (e) => {
            selectedAmount = e.target.value;
        });

        document.getElementById('donationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const amount = selectedAmount || customAmountInput.value;
            const type = document.getElementById('donationType').value;
            const name = document.getElementById('donorName').value;
            const email = document.getElementById('donorEmail').value;
            
            if (!amount || amount <= 0) {
                alert('Selecteer alstublieft een donatiebedrag.');
                return;
            }
            
            if (!name || !email) {
                alert('Vul alstublieft alle vereiste velden in.');
                return;
            }
            
            const btn = document.querySelector('.donate-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Verwerken...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert(`Bedankt ${name}! Uw ${type} donatie van €${amount} wordt verwerkt. U ontvangt een bevestiging per e-mail.`);
                btn.textContent = originalText;
                btn.disabled = false;
                
                document.getElementById('donationForm').reset();
                amountBtns.forEach(b => b.classList.remove('active'));
                customAmountInput.style.display = 'none';
                selectedAmount = null;
            }, 2000);
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/,/g, ''));
                    let current = 0;
                    const increment = target / 100;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-number').forEach(counter => {
            observer.observe(counter);
        });
