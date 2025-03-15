function DarkModeToggle({ darkMode, setDarkMode }) {
    return (
      <div className="text-center my-3">
        <button
          className="btn btn-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    );
  }
  
  export { DarkModeToggle };