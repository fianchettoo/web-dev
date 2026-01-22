jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

jest.mock('../utils/translations', () => ({
  getTranslation: jest.fn(),
  getLanguage: jest.fn()
}));

const fs = require('fs').promises;
const translations = require('../utils/translations');
const { createResponse } = require('./_mockResponse');

describe('handleHome', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders index template with title from translations', async () => {
    const fakeTemplate = '<html><body><h1><%= translations.title %></h1></body></html>';
    fs.readFile.mockResolvedValue(fakeTemplate);

    translations.getLanguage.mockReturnValue('en');
    translations.getTranslation.mockImplementation((lang, key) => {
      if (key === 'title') return 'Test Title';
      if (key === 'selectLabel') return 'Select';
      if (key === 'button') return 'Go';
      if (key.startsWith('readers.')) return 'Reader';
      return key;
    });

    const { handleHome } = require('../handlers/home');

    const req = { url: '/', method: 'GET', headers: {} };
    const res = createResponse();

    await handleHome(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('<h1>Test Title</h1>');
    expect(fs.readFile).toHaveBeenCalled();
  });
});
