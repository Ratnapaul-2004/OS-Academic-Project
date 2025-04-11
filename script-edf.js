function simulateEDF() {
    console.log("simulateEDF function is being called"); // Add this for debugging
    // Get task input values
    const task1 = { period: parseInt(document.getElementById('task1-period').value), 
        execTime: parseInt(document.getElementById('task1-exec').value), 
        name: 'Task 1', deadline: parseInt(document.getElementById('task1-period').value) 
    };
    const task2 = { period: parseInt(document.getElementById('task2-period').value), 
        execTime: parseInt(document.getElementById('task2-exec').value), 
        name: 'Task 2', deadline: parseInt(document.getElementById('task2-period').value) 
    };
    const task3 = { period: parseInt(document.getElementById('task3-period').value), 
        execTime: parseInt(document.getElementById('task3-exec').value), 
        name: 'Task 3', deadline: parseInt(document.getElementById('task3-period').value) 
    };
  
    const tasks = [task1, task2, task3];
  
    // Hyperperiod calculation (LCM of task periods)
    const hyperperiod = lcm(task1.period, task2.period, task3.period);
    let timeline = Array(hyperperiod).fill('Idle'); // Initialize timeline with "Idle"
  
    // Simulation loop over each time slot
    for (let time = 0; time < hyperperiod; time++) {
      // Update deadlines and check if new task period starts
      for (let task of tasks) {
        if (time % task.period === 0) {
          task.remainingTime = task.execTime; // Reset task execution time at the start of each period
          task.deadline = time + task.period; // Update task's deadline
        }
      }
  
      // Filter active tasks (those with remaining execution time > 0)
      const activeTasks = tasks.filter(task => task.remainingTime > 0);
  
      if (activeTasks.length > 0) {
        // Sort active tasks by deadline (earliest deadline first)
        activeTasks.sort((a, b) => a.deadline - b.deadline);
  
        // Schedule the task with the earliest deadline
        const currentTask = activeTasks[0];
        timeline[time] = currentTask.name; // Assign task to current time slot
        currentTask.remainingTime--; // Decrement remaining execution time
      }
    }
  
    // Display results
    displayEDFResults(timeline);
  }
  
  // Helper function to display the timeline results
  function displayEDFResults(timeline) {
    const resultDiv = document.getElementById('edf-results');
    resultDiv.innerHTML = `<p>Task Execution Timeline (Hyperperiod: ${timeline.length}):</p>`;
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
  