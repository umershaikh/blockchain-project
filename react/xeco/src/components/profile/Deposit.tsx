import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface DepositProps {
  isModalOpen: boolean;
  closeModal: () => void;
  userId?: string; // Optional prop for user ID
}

const Deposit: React.FC<DepositProps> = ({ isModalOpen, closeModal, userId = '7' }) => { // Default to '7' if not provided
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const MIN_DEPOSIT = 25; // Minimum deposit amount in dollars

  const handleNext = () => {
    const amountNum = parseFloat(amount);

    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    if (isNaN(amountNum) || amountNum < MIN_DEPOSIT) {
      toast.error(`Minimum deposit amount is $25. You entered $${amountNum || 0}.`);
      return;
    }

    setIsLoading(true);

    const payload = {
      amount: amount,
      user_id: userId,
    };

    fetch('http://127.0.0.1:8000/api/create-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.payment_url) {
          window.location.href = data.payment_url;
        } else {
          toast.error('Error: ' + JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error('Error creating payment:', error);
        toast.error('There was an error processing your payment.');
      })
      .finally(() => {
        setIsLoading(false);
        closeModal();
      });
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ background: '#2a2a2a', color: '#fff', borderRadius: '12px' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>
                  Deposit Funds
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="amountInput" className="form-label">Amount (Min $25)</label>
                  <input
                    type="number"
                    id="amountInput"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    style={{ background: '#3a3a3a', color: '#fff', border: 'none' }}
                    min={MIN_DEPOSIT}
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className="btn-primary px-4"
                  style={{ borderRadius: '8px' }}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : (
                    <i className="fas fa-wallet fa-lg me-2"></i>
                  )}
                  Next
                </button>
                <button
                  onClick={closeModal}
                  className="btn-secondary px-4"
                  style={{ borderRadius: '8px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Deposit;