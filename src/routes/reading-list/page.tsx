const books = [
  {
    title:
      'Scary Smart: The Future of Artificial Intelligence and How You Can Save Our World',
    author: 'Mo Gawdat',
  },
  {
    title: 'The Shallows: How the Internet Is Changing the Way We Think',
    author: 'Carr',
  },
  {
    title: 'Pragmatic Programmer, The: Your journey to mastery',
    author: 'Andrew Hunt, David Thomas',
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
  },
  {
    title: 'Slow Productivity: The Lost Art of Accomplishment Without Burnout',
    author: 'Cal Newport',
  },
  {
    title: 'Digital Minimalism: Choosing a Focused Life in a Noisy World',
    author: 'Cal Newport',
  },
  {
    title: 'Getting Things Done: The Art of Stress-free Productivity',
    author: 'David Allen',
  },
  {
    title: 'Eat & Run: My Unlikely Journey to Ultramarathon Greatness',
    author: 'Scott Jurek',
  },
  {
    title:
      'The Rise of the Ultra Runners: A Journey to the Edge of Human Endurance',
    author: 'Adharanand Finn',
  },
  { title: 'Born to Run', author: 'Christopher McDougall' },
  { title: 'Finding Ultra', author: 'Rich Roll' },
  {
    title: "Can't Hurt Me: Master Your Mind and Defy the Odds",
    author: 'David Goggins',
  },
  {
    title: 'Essentialism: The Disciplined Pursuit of Less',
    author: 'Greg Mckeown',
  },
];

const Index = () => (
  <div className="container-box">
    Hello from Reading List
    <ul>
      {books.map(book => (
        <li key={book.title}>
          <span>
            <strong>{book.title}</strong>
          </span>{' '}
          | <span>{book.author}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Index;
