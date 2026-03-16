import { useState } from 'react';
import { Button } from '../../../shared/components/Button';

export function Agreement() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const agreementText = `
    SURVEY PARTICIPATION AGREEMENT
    
    By participating in this survey, you acknowledge and agree to the following terms:
    
    1. Data Collection: We will collect and process the information you provide in this survey.
    
    2. Confidentiality: Your responses will be kept confidential and used only for research purposes.
    
    3. Voluntary Participation: Your participation is completely voluntary, and you may withdraw at any time.
    
    4. Data Usage: The data collected may be used for analysis, reporting, and improving our services.
    
    5. Privacy: We will not share your personal information with third parties without your consent.
    
    6. Accuracy: You agree to provide accurate and truthful information to the best of your knowledge.
    
    By checking the box below and clicking "I Agree", you confirm that you have read, understood, 
    and agree to these terms.
  `;

  const handleSubmit = async () => {
    if (!agreed) {
      alert('Please agree to the terms to continue');
      return;
    }

    try {
      setLoading(true);
      // API call to submit agreement
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Agreement accepted');
      alert('Thank you for agreeing to the terms!');
    } catch (error) {
      console.error('Failed to submit agreement:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Agreement</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="prose max-w-none mb-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded border border-gray-200">
            {agreementText}
          </pre>
        </div>

        <div className="mb-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <span className="text-sm text-gray-700">
              I have read and agree to the terms and conditions stated above
            </span>
          </label>
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={!agreed || loading}
          >
            {loading ? 'Processing...' : 'I Agree'}
          </Button>
          <Button variant="secondary" onClick={() => window.history.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
