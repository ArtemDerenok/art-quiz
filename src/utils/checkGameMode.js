const checkGameMode = () => {
  if (localStorage.getItem('gameModeQuiz') === 'artist-category') {
    return 'artist';
  }
  return 'picture';
};

export default checkGameMode;
