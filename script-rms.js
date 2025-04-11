function simulateRMS() {
    console.log("simulateRMS function is being called"); // Add this for debugging

    // Get task input values and ensure they're valid
    const task1 = {
      period: parseInt(document.getElementById('task1-period').value),
      execTime: parseInt(document.getElementById('task1-exec').value),
      name: 'Task 1',
      remainingTime: 0
    };
    const task2 = {
      period: parseInt(document.getElementById('task2-period').value),
      execTime: parseInt(document.getElementById('task2-exec').value),
      name: 'Task 2',
      remainingTime: 0
    };
    const task3 = {
      period: parseInt(document.getElementById('task3-period').value),
      execTime: parseInt(document.getElementById('task3-exec').value),
      name: 'Task 3',
      remainingTime: 0
    };
  
    // Ensure valid inputs
    if (isNaN(task1.period) || isNaN(task1.execTime) || isNaN(task2.period) || isNaN(task2.execTime) || isNaN(task3.period) || isNaN(task3.execTime)) {
      alert("Please enter valid numeric values for all periods and execution times.");
      return;
    }
  
    const tasks = [task1, task2, task3];
  
    // Sort tasks by period (RMS prioritizes tasks with the shortest period)
    tasks.sort((a, b) => a.period - b.period);
  
    // Calculate the least common multiple (LCM) of task periods
    const hyperperiod = lcm(task1.period, task2.period, task3.period);
  
    // Initialize the timeline with "Idle"
    let timeline = Array(hyperperiod).fill('Idle');
  
    // RMS scheduling loop
    for (let time = 0; time < hyperperiod; time++) {
      for (let task of tasks) {
        // Check if the task starts a new period
        if (time % task.period === 0) {
          task.remainingTime = task.execTime; // Reset task execution time at the start of each period
        }
  
        // If the task still has execution time left, schedule it
        if (task.remainingTime > 0) {
          timeline[time] = task.name; // Assign the task to the current time slot
          task.remainingTime--; // Decrement the remaining execution time
          break; // Preempt lower-priority tasks
        }
      }
    }
  
    // Display the results in the timeline
    displayRMSResults(timeline, hyperperiod);
  }
  
  // Helper function to display the timeline results
  function displayRMSResults(timeline, hyperperiod) {
    const resultDiv = document.getElementById('rms-results');
    resultDiv.innerHTML = `<p>Task Execution Timeline (Hyperperiod: ${hyperperiod}):</p>`;
    let timelineStr = timeline.map((slot, index) => `${index}: ${slot}`).join('<br>');
    resultDiv.innerHTML += `<pre>${timelineStr}</pre>`;
  }
  
  // Helper function to calculate Least Common Multiple (LCM) of task periods
  function lcm(a, b, c) {
    return lcmTwoNumbers(lcmTwoNumbers(a, b), c);
  }
  
  function lcmTwoNumbers(a, b) {
    return Math.abs(a * b) / gcd(a, b);
  }
  
  // Helper function to calculate Greatest Common Divisor (GCD)
  function gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }
  