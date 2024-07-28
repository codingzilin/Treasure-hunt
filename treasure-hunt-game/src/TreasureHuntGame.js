import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui';
import { Button } from './components/ui';
import { Input } from './components/ui';
import { Alert, AlertDescription, AlertTitle } from './components/ui';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hints, setHints] = useState([]);
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaderboard`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const register = async () => {
    try {
      await axios.post(`${API_URL}/register`, { name, email });
      setUser({ name, email });
      fetchHints();
    } catch (error) {
      setMessage(error.response.data.detail || 'Registration failed');
    }
  };

  const fetchHints = async () => {
    try {
      const response = await axios.get(`${API_URL}/hints`, { params: { email } });
      setHints(response.data);
    } catch (error) {
      console.error('Error fetching hints:', error);
    }
  };

  const updateLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        await axios.post(`${API_URL}/location`, {
          email,
          location: { lat: latitude, lng: longitude },
        });
        setMessage('Location updated successfully');
      });
    } catch (error) {
      setMessage('Failed to update location');
    }
  };

  const submitAnswer = async () => {
    try {
      const response = await axios.post(`${API_URL}/answer`, { email, answer });
      setMessage(response.data.message);
      if (response.data.hint) {
        setHints([...hints, response.data.hint]);
      }
      setAnswer('');
      fetchLeaderboard();
    } catch (error) {
      setMessage('Failed to submit answer');
    }
  };

  const findTreasure = async () => {
    try {
      const response = await axios.post(`${API_URL}/find-treasure`, null, { params: { email } });
      setMessage(response.data.message);
      fetchLeaderboard();
    } catch (error) {
      setMessage('Failed to find treasure');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Treasure Hunt Game</h1>
      {!user ? (
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2"
            />
            <Button onClick={register}>Register</Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Game Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={updateLocation} className="mr-2">Update Location</Button>
              <Button onClick={findTreasure}>Find Treasure</Button>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Hints</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Submit Answer</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="mb-2"
              />
              <Button onClick={submitAnswer}>Submit</Button>
            </CardContent>
          </Card>
        </div>
      )}
      {message && (
        <Alert className="mb-4">
          <AlertTitle>Message</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {leaderboard.map((player, index) => (
              <li key={index}>
                {player.name}: {player.score}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;