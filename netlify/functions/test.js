exports.handler = async function () {
  return {
    statusCode: 200,
    body: `Token: ${process.env.HF_ACCESS_TOKEN || 'Missing'}`
  };
};
