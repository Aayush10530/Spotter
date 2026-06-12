import { render, screen } from '@testing-library/react';
import App from './App';

// Mock RouteMap to bypass react-leaflet ES module issues in Jest
jest.mock('./components/RouteMap/RouteMap', () => {
  return function MockRouteMap() {
    return <div data-testid="mock-route-map">Route Map</div>;
  };
});

// Mock pdfExporter to bypass jspdf/TextEncoder issues in Jest
jest.mock('./utils/pdfExporter', () => {
  return {
    exportELDLogPDF: jest.fn()
  };
});

test('renders SpotterAI brand name', () => {
  render(<App />);
  const brandElement = screen.getByText(/SpotterAI/i);
  expect(brandElement).toBeInTheDocument();
});
