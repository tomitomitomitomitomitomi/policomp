export  const sendVote = async (vote: {x:number, y: number}) => {
    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote),
      });

      if (!response.ok) {
        throw new Error('Failed to send vote');
      }

    } catch (error) {
      console.error('Error sending vote:', error);
    }
  };