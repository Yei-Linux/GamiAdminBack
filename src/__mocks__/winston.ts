export default {
  addColors: jest.fn(),
  format: {
    printf: jest.fn(),
    combine: jest.fn(),
    colorize: jest.fn(),
    simple: jest.fn(),
    json: jest.fn(),
    label: jest.fn(),
    timestamp: jest.fn(),
  },
  transports: {
    File: jest.fn(),
    Console: jest.fn(),
  },
  createLogger: jest.fn(() => ({
    log: jest.fn(),
  })),
};
