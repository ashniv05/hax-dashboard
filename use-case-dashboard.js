import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";

class UseCaseDashboard extends DDDSuper(LitElement) {
  static styles = css`
    :host {
  display: block;
  font-family: var(--ddd-font-navigation, Arial, sans-serif);
  background-color: var(--ddd-theme-default-background, #ffffff);
  color: #001f5b; 
  height: 100%; 
  min-height: 100vh; 
  overflow: hidden; /* hide black space */
}

    /* header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ccc;
      padding: 12px 20px;
    }

    .header .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header .logo img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .header .nav-links {
      display: flex;
      gap: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #001f5b;
    }

    .header .nav-links a {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    .header .nav-links a:hover {
      text-decoration: underline;
    }

    .header .account {
      font-size: 16px;
      font-weight: bold;
    }

    /* new journey */
    .new-journey {
      text-align: center;
      margin: 40px 0;
      padding: 20px;
      background-color: var(--ddd-theme-default-white, #fef8f8);
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .new-journey h2 {
      text-align: center;
      font-size: 28px;
      margin-bottom: 10px;
      color: #001f5b;
    }

    .use-case-examples ul {
      list-style-type: none;
      padding: 0;
    }

    .use-case-examples li {
      margin: 10px 0;
    }

    .use-case-examples a {
      text-decoration: none;
      color: #001f5b;
      cursor: pointer;
    }

    .use-case-examples a:hover {
      text-decoration: underline;
    }

    /* tags */
    .tags-section {
      text-align: center;
      margin: 20px 0 30px 0;
    }

    .tags-section h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .tags-list {
      display: flex;
      gap: 15px;
      justify-content: center;
    }

    .tags-list .tag {
      background-color: #f4f4f4;
      padding: 8px 15px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      color: #001f5b;
      transition: background-color 0.3s;
    }

    .tags-list .tag:hover {
      background-color: #ddd;
    }

    /* reset button container */
    .reset-button-container {
      display: flex;
      justify-content: flex-end; /* Align the button to the right */
      margin-right: 20px; /* Space between button and screen edge */
      margin-top: 10px;
    }

    /* reset button */
    .reset-button {
      background-color: #ffffff; /* White background */
      color: #001f5b; /* Dark blue text */
      border: 1px solid #001f5b; /* Dark blue border */
      border-radius: var(--ddd-radius-xs);
      padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
      font-size: var(--ddd-font-size-4xs);
      cursor: pointer;
      display: inline-block;
      transition: background-color 0.3s, color 0.3s; /* Smooth transition */
    }

    .reset-button:hover {
      background-color: #afb1b4; /* Dark blue on hover */
      color: #ffffff; /* White text on hover */
    }

    /* dashboard */
    .dashboard {
      display: flex;
      padding: 16px;
      gap: 20px;
      height: calc(100vh - 60px); /* height - header */
      overflow: auto;
    }

    .filters {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;
      background: var(--ddd-theme-default-white, #fff);
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .filters h2 {
      margin-top: 0;
      font-size: 18px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 8px;
    }

    .filters label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      margin: 8px 0;
    }

    .filters input[type="checkbox"] {
      margin: 0;
    }

    .filters .search-bar {
      margin-bottom: 16px;
    }

    .filters input[type="text"] {
      width: 95%;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .cards {
      flex: 3;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* adjust card width */
      gap: 24px;
    }

    use-case-card {
      background-color: var(--ddd-theme-default-white, #fff);
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    use-case-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  `;

  static get properties() {
    return {
      useCases: { type: Array },
      filteredUseCases: { type: Array },
      selectedFilters: { type: Array },
      results: { type: Number },
      searchBar: { type: String },
      activeTags: { type: Array },
    };
  }

  constructor() {
    super();
    this.useCases = [];
    this.filteredUseCases = [];
    this.selectedFilters = [];
    this.results = 0;
    this.searchBar = "";
    this.activeTags = [];
    this.loadUseCaseData();
  }

  async loadUseCaseData() {
    try {
      const response = await fetch(new URL("./lib/use-case-data.json", import.meta.url).href);
      if (response.ok) {
        const data = await response.json();
        this.useCases = data.data;
        this.filteredUseCases = [...this.useCases];
        this.results = this.filteredUseCases.length;
      }
    } catch (error) {
      console.error("Error fetching use-case data:", error);
      this.useCases = [];
      this.filteredUseCases = [];
    }
  }

  filterUseCases() {
    if (this.selectedFilters.length === 0 && this.activeTags.length === 0) {
      this.filteredUseCases = this.useCases.filter((useCase) => {
        const matchesSearch = useCase.name.toLowerCase().includes(this.searchBar.toLowerCase());
        return matchesSearch;
      });
    } else {
      this.filteredUseCases = this.useCases.filter((useCase) => {
        const matchesSearch = useCase.name.toLowerCase().includes(this.searchBar.toLowerCase());
        const matchesFilters = this.selectedFilters.every((filter) => useCase.tags?.includes(filter));
        const matchesTags = this.activeTags.every((tag) => useCase.tags?.includes(tag));
        return matchesSearch && matchesFilters && matchesTags;
      });
    }

    this.results = this.filteredUseCases.length;
  }

  resetFilters() {
    this.selectedFilters = [];
    this.activeTags = [];
    this.searchBar = "";
    this.filteredUseCases = [...this.useCases];
    this.results = this.filteredUseCases.length;
    this.requestUpdate();
  }

  handleFilterChange(event) {
    const filter = event.target.value;
    if (event.target.checked) {
      this.selectedFilters = [...this.selectedFilters, filter];
    } else {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
    }
    this.filterUseCases();
  }

  handleTagClick(tag) {
    if (this.activeTags.includes(tag)) {
      this.activeTags = this.activeTags.filter((t) => t !== tag);
    } else {
      this.activeTags = [...this.activeTags, tag];
    }
    this.filterUseCases();
  }

  handleSearchChange(event) {
    this.searchBar = event.target.value;
    this.filterUseCases();
  }

  searchUseCase(useCase) {
    this.searchBar = useCase;
    this.filterUseCases();
  }

  render() {
    return html`
      <div class="header">
        <div class="logo">
          <img src="https://avatars.githubusercontent.com/u/170651362?s=200&v=4" alt="HAX Logo" />
        </div>
        <div class="nav-links">
          <a>Merlin</a>
          <a>Search Sites</a>
        </div>
        <div class="account">apv5378@psu.edu</div>
      </div>

      <div class="new-journey">
        <h2>Pick a Journey and Start Exploring!</h2>
        <div class="use-case-examples">
          <ul>
            <li><a href="javascript:void(0)" @click="${() => this.searchUseCase('Portfolio')}">Portfolio Website</a></li>
            <li><a href="javascript:void(0)" @click="${() => this.searchUseCase('Course')}">Course Website</a></li>
          </ul>
        </div>
      </div>

      <div class="tags-section">
        <div class="tags-list">
          <span class="tag" @click="${() => this.handleTagClick('Portfolio')}">Portfolio</span>
          <span class="tag" @click="${() => this.handleTagClick('Course')}">Course</span>
          <span class="tag" @click="${() => this.handleTagClick('Resume')}">Resume</span>
          <span class="tag" @click="${() => this.handleTagClick('Research Website')}">Research Website</span>
        </div>
        <div class="reset-button-container">
          <button @click="${this.resetFilters}" class="reset-button">Reset</button>
        </div>
      </div>

      <div class="dashboard">
        <div class="filters">
          <h2>Templates</h2>
          <div class="search-bar">
            <input type="text" placeholder="Search templates..." @input="${this.handleSearchChange}" .value="${this.searchBar}" />
          </div>
          ${this.generateFilters()}
        </div>
        <div class="cards">
          ${this.filteredUseCases.map(
            (useCase) =>
              html`<use-case-card title="${useCase.name}" description="${useCase.description}" demoLink="${useCase.demo_link}"></use-case-card>`
          )}
        </div>
      </div>
    `;
  }

  generateFilters() {
    const uniqueTags = [...new Set(this.useCases.flatMap((useCase) => useCase.tags || []))];
    return uniqueTags.map(
      (tag) =>
        html`<label>
          <input type="checkbox" value="${tag}" @change="${this.handleFilterChange}" />
          ${tag}
        </label>`
    );
  }

  static get tag() {
    return "use-case-dashboard";
  }
}

customElements.define(UseCaseDashboard.tag, UseCaseDashboard);
