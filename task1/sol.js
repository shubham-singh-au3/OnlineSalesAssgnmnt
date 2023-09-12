function simulateEvent(prbabltes) {
    const random = Math.random();
    let cmltvPrbablty = 0;
    for (const [outcome, prbablty] of Object.entries(prbabltes)) {
      cmltvPrbablty += prbablty;
      if (random <= cmltvPrbablty) {
        return outcome;
      }
    }
    return;
  }
  
  // map
  const eventPrbabltes = {
    'Head': 0.35,
    'Tail': 0.65
  };

  const numOccurrences = 1000;
  const outcomeCounts = {};
  
  //Simulate the event and count outcomes
  for (let i = 0; i < numOccurrences; i++) {
    const result = simulateEvent(eventPrbabltes);
    outcomeCounts[result] = (outcomeCounts[result] || 0) + 1;
  }
  
  //Calculate and display the Occurrences
  for (const [outcome, count] of Object.entries(outcomeCounts)) {
    console.log(`${outcome}: ${count}`);
  }