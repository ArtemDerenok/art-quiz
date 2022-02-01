const getQuestions = async () => {
  const data = await fetch('./questions.json');
  const result = await data.json();
  return result;
};

export default getQuestions;
