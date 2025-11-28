import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/table';

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
  <div>
    <h1>Reading List</h1>
    <p>
      Welcome to my reading list — a personal collection of books that have
      inspired me, challenged my thinking, or simply sparked my curiosity. I use
      this space to keep track of the books I’ve read along the way. Maybe
      you’ll find something here that resonates with you as well.
    </p>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map(book => (
          <TableRow key={book.title}>
            <TableCell key={book.title}>{book.title}</TableCell>
            <TableCell key={book.author}>{book.author}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default Index;
