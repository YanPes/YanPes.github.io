const About = () => (
  <div>
    <h1>Hi there, welcome to my corner of the Web 👋</h1>

    <p>
      I'm a Frontend Software Architect who thrives on building scalable web
      ecosystems. My professional journey is focused on decoupling large-scale
      systems and fostering collaboration among development teams. Outside of
      work, you'll find me trading code for mountain trails and good books,
      always seeking new ways to learn and grow. Feel free to explore my work
      and interests below!
    </p>

    <h2>💼 Work & Expertise</h2>

    <p>
      As a Frontend Software Architect at Festo, I focus on transforming
      complex, monolithic web systems into dynamic, interconnected
      micro-frontend architectures. My main responsibility is the technical
      orchestration of frontends, enabling decentralized teams to work
      efficiently on a shared customer journey. In this role, I ensure our
      systems are performance, secure, resilient, and communicate seamlessly. I
      also own onboarding and governance documents and serve as a technical
      mentor and consultant for developers, stakeholders, and design teams.
    </p>

    <h2>🏃‍♂️ Off-Screen Balance</h2>

    <p>
      To maintain my productivity and mental balance, I enjoy spending my free
      time away from the screen:
    </p>

    <ul>
      <li>Trail running & hiking in the mountains</li>
      <li>Alpine skiing</li>
      <li>Reading & cooking</li>
      <li>Exploring nature and other cultures with my girlfriend</li>
    </ul>

    <p>
      When I do find time for private coding, it's usually for research or
      tinkering with my Neovim configuration.
    </p>

    <h2>🛠️ Languages and Libraries</h2>

    <h3>Classic Frontend</h3>
    <p>
      Yes, I learned frontend when jQuery was the GOAT! Having a solid
      foundation on classic technology without abstraction layers is mandatory
      to actually understand any advanced framework or toolkit (looking at you
      React and Tailwind).
    </p>

    <ul>
      <li>HTML5</li>
      <li>Handlebars</li>
      <li>CSS3</li>
      <li>SCSS/SASS</li>
      <li>Vanilla Javascript</li>
      <li>jQuery</li>
      <li>Node.js</li>
    </ul>

    <h3>Modern Frontend</h3>
    <p>
      Advanced tools I work with for modern web application development with a
      focus on first level citizen products for micro frontend architectures.
    </p>

    <ul>
      <li>Typescript</li>
      <li>React</li>
      <li>Modern.js</li>
      <li>Rsbuild</li>
      <li>Rspress</li>
      <li>Rslib</li>
      <li>Rstest</li>
      <li>Module Federation</li>
      <li>Nx</li>
    </ul>

    <h3>Bundler</h3>
    <p>
      It is my daily business to adapt, maintain and modernize/migrate bundlers
      to keep pipeline performance, frontend infrastructure and developer
      experience on a peak level. This also includes writing custom Rspack
      plugins (Rust bundler following the amazing API architecture philosophy of
      Webpack)
    </p>

    <ul>
      <li>Rspack</li>
      <li>Webpack</li>
      <li>Gulp</li>
      <li>Bower</li>
      <li>Grunt</li>
    </ul>

    <h3>Infra</h3>
    <p>
      I am not a DevOps specialist but I am familiar configuring infrastructure
      for large-scale operations
    </p>

    <ul>
      <li>Gitlab CI</li>
      <li>Docker</li>
      <li>k8s</li>
      <li>Traefik</li>
      <li>Argo CD</li>
    </ul>

    <h3>Generic</h3>
    <p>Additional tech I like to use to keep the work rolling.</p>

    <ul>
      <li>oAuth</li>
      <li>Open API</li>
      <li>Lua</li>
      <li>Vim / Neovim</li>
      <li>Bash / Shell</li>
    </ul>

    <h2>⚙️ My Dev Setup</h2>

    <p>
      I'm a strong believer in a highly customized and efficient development
      environment. My setup is built around a few key tools that help me stay
      productive and focused.
    </p>

    <h3>Operating System</h3>
    <p>
      My go-to setup is Arch Linux paired with Hyprland, a dynamic tiling
      Wayland compositor, to manage my windows and workspaces with ease. Maybe a
      bit overkill, but I have too much fun to tinker with and rice my Linux.
      Unfortunately, I am bound to a Windows machine at work trying by best to
      be friends with WLS 🙈
    </p>

    <h3>Core Tools</h3>
    <ul>
      <li>
        Neovim: My custom-built Neovim configuration is the heart of my coding
        workflow. It's a lightweight, powerful, and keyboard-centric editor
        tailored to my needs.
      </li>
      <li>
        Tmux: I use Tmux to manage multiple terminal sessions and windows from a
        single screen. This lets me handle different tasks—from running tests to
        monitoring logs—without ever leaving my terminal.
      </li>
      <li>
        Lazygit & LazyDocker: To interact with Git and Docker in a fast and
        intuitive way, I rely on these two tools. They provide a simple,
        terminal-based user interface that makes complex tasks quick and
        effortless.
      </li>
    </ul>

    <p>
      My entire setup is designed to be fast, keyboard-driven, and
      distraction-free, allowing me to fully immerse myself in the code. As most
      of my configuration is on GitHub, I am able to quickly get started in no
      time on any machine.
    </p>
  </div>
);

export default About;
