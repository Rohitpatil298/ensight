export function SurveyCard({ survey, onClick }) {
  return (
    <div
      onClick={() => onClick(survey)}
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{survey.title}</h3>
      <p className="text-gray-600 mb-4">{survey.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Responses: {survey.responseCount || 0}</span>
        <span className={`px-2 py-1 rounded ${
          survey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {survey.status}
        </span>
      </div>
    </div>
  );
}
