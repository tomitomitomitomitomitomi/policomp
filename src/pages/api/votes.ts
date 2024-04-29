import type { NextApiRequest, NextApiResponse } from "next";

let votes: {x: number, y: number}[]= [];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
  if (req.method === 'POST') {
    const { x, y } = req.body;
    votes.push({ x, y });
    return res.status(201).json({ message: 'Vote added' });
  } else if (req.method === 'GET') {
    const average = votes.reduce(
      (acc, vote) => {
        acc.x += vote.x;
        acc.y += vote.y;
        return acc;
      },
      { x: 0, y: 0 }
    );

    if (votes.length > 0) {
      average.x /= votes.length;
      average.y /= votes.length;
    }
    const response = {
      average: average,
      clean: votes.length === 0 
  };

    return res.status(200).json(response);
  } 
}
