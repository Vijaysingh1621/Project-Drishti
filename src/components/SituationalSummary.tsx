
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

const SituationalSummary = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'user',
      content: 'Summarize security concerns in West Zone',
      timestamp: '14:35'
    },
    {
      type: 'ai',
      content: 'West Zone Analysis: High crowd density (500+ people) detected with rising negative sentiment on social media. Two security incidents reported in past hour. Recommend additional security personnel deployment.',
      timestamp: '14:35'
    }
  ]);

  const predefinedQueries = [
    'What are current safety risks?',
    'Show crowd movement patterns',
    'Summarize emergency response status',
    'Analyze social media sentiment'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newUserMessage = {
      type: 'user' as const,
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Simulate AI response based on query
    let aiResponse = '';
    if (query.toLowerCase().includes('safety') || query.toLowerCase().includes('risk')) {
      aiResponse = 'Current safety status: 3 active alerts, 2 bottleneck predictions, overall risk level: MEDIUM. Emergency services on standby.';
    } else if (query.toLowerCase().includes('crowd') || query.toLowerCase().includes('movement')) {
      aiResponse = 'Crowd movement analysis: Peak density at Main Stage (500 people), steady flow at exits, no unusual patterns detected in past 10 minutes.';
    } else if (query.toLowerCase().includes('emergency') || query.toLowerCase().includes('response')) {
      aiResponse = 'Emergency response: 4 medical teams deployed, 2 security units active, average response time: 2.3 minutes, no critical incidents.';
    } else {
      aiResponse = 'Analysis complete. Current situation appears stable with standard crowd management protocols in effect. Monitoring continues.';
    }

    const newAiMessage = {
      type: 'ai' as const,
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newUserMessage, newAiMessage]);
    setQuery('');
  };

  return (
    <Card className="h-96 shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Situational Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-2 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`p-2 rounded-full ${
                  message.type === 'user' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {message.type === 'user' ? 
                    <User className="h-4 w-4 text-blue-600" /> : 
                    <Bot className="h-4 w-4 text-green-600" />
                  }
                </div>
                <div className={`p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {predefinedQueries.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setQuery(q)}
                className="text-xs"
              >
                {q}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about the current situation..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default SituationalSummary;
