const chakram = require('chakram');
const expect = chakram.expect;
const SERVER_ADDRESS = `http://localhost:1234`;

describe('Route', () => {
  describe('POST /api/1/apps', () => {
    it('should return 400 when no payload', () => {
      const response = chakram.post(`${SERVER_ADDRESS}/api/1/apps`);
      expect(response).to.have.status(400);
      expect(response).to.have.json('Invalid JSON');
      return chakram.wait();
    });

    it('should return 400 when non object payload', () => {
      const response = chakram.post(`${SERVER_ADDRESS}/api/1/apps`, 0);
      expect(response).to.have.status(400);
      expect(response).to.have.json('Invalid app');
      return chakram.wait();
    });

    it('should return 201 when valid payload', () => {
      const response = chakram.post(`${SERVER_ADDRESS}/api/1/apps`, { foo: 'bar' });
      expect(response).to.have.status(201);

      return chakram.wait();
    });
  });
  describe('DELETE /api/1/apps/:id', () => {
    it('should return 400 when no id', () => {
      const response = chakram.delete(`${SERVER_ADDRESS}/api/1/apps/`);
      expect(response).to.have.status(400);
      expect(response).to.have.json('Invalid app id');

      return chakram.wait();
    });

    it('should return 400 when invalid id', () => {
      const response = chakram.delete(`${SERVER_ADDRESS}/api/1/apps/string-id`);
      expect(response).to.have.status(400);
      expect(response).to.have.json('Invalid app id');

      return chakram.wait();
    });

    it('should return 201 when valid id', () => {
      const response = chakram.delete(`${SERVER_ADDRESS}/api/1/apps/1234`);
      expect(response).to.have.status(204);

      return chakram.wait();
    });
  });
  describe('unknown', () => {
    it('should return 404', () => {
      const response = chakram.get(`${SERVER_ADDRESS}/api/1/foo`);
      expect(response).to.have.status(404);
      expect(response).to.have.json('Not found');
      return chakram.wait();
    });
  });
});
