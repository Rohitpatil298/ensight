import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Form, FormField } from '../../../shared/components/Form';

export function ModuleAssign() {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedModules, setSelectedModules] = useState([]);

  const divisions = [
    { id: 1, name: 'Division A' },
    { id: 2, name: 'Division B' },
  ];

  const modules = [
    { id: 1, name: 'Survey Module' },
    { id: 2, name: 'Non-Survey Module' },
    { id: 3, name: 'FastBook Module' },
    { id: 4, name: 'RBD Module' },
  ];

  const handleModuleToggle = (moduleId) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assigning modules:', { selectedDivision, selectedModules });
    // Add API call here
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Assign Modules to Division</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <Form onSubmit={handleSubmit}>
          <FormField label="Select Division" required>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Select Modules" required>
            <div className="space-y-2">
              {modules.map((module) => (
                <label key={module.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module.id)}
                    onChange={() => handleModuleToggle(module.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{module.name}</span>
                </label>
              ))}
            </div>
          </FormField>

          <Button type="submit">Assign Modules</Button>
        </Form>
      </div>
    </div>
  );
}
