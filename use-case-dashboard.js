import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d";
import "./use-case-card.js";

class UseCaseDashboard extends DDDSuper(LitElement) {
  static styles = css`
    :host {
      display: block;
      font-family: var(--ddd-font-primary, roboto);
      background-color: var(--ddd-theme-default-potentialMidnight);
      color: var(--ddd-theme-default-potentialMidnight);
      height: 100%;
      min-height: 100vh;
      overflow: hidden; /* hide black space */
    }

    /* header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--ddd-theme-default-slateMaxLight);
      padding: var(--ddd-spacing-3) var(--ddd-spacing-6);
    }

    .header .logo {
      display: flex;
      align-items: center;
      gap: var(--ddd-spacing-3);
    }

    .header .logo img {
      width: 40px;
      height: 40px;
      border-radius: var(--ddd-radius-sm);
    }

    .header .nav-links {
      display: flex;
      gap: var(--ddd-spacing-5);
      font-size: var(--ddd-font-size-3xs);
      font-weight: var(--ddd-font-weight-bold);
      color: var(--ddd-theme-default-navy);
    }

    .header .nav-links a {
      text-decoration: none;
      color: var(--ddd-theme-default-navy);
      cursor: pointer;
    }

    .header .nav-links a:hover {
      text-decoration: underline;
    }

    .header .account {
      font-size: var(--ddd-font-size-3xs);
      font-weight: var(--ddd-font-weight-regular);
    }

    /* new journey */
    .new-journey {
      text-align: center;
      margin: var(--ddd-spacing-5) auto;
      padding: var(--ddd-spacing-5);
      background-color: var(--ddd-theme-default-slateMaxLight);
      border-radius: var(--ddd-radius-lg);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .new-journey h2 {
      text-align: center;
      font-size: var(--ddd-font-size-xl);
      margin-bottom: var(--ddd-spacing-3);
      color: var(--ddd-theme-default-potentialMidnight);
    }

    .use-case-examples ul {
      list-style-type: none;
      padding: var(--ddd-spacing-0);
    }

    .use-case-examples li {
      margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
    }

    .use-case-examples a {
      text-decoration: none;
      color: var(--ddd-theme-default-potentialMidnight);
      cursor: pointer;
    }

    .use-case-examples a:hover {
      text-decoration: underline;
    }

    /* tags */
    .tags-section {
      text-align: center;
      margin: var(--ddd-spacing-5) var(--ddd-spacing-7);
    }

    .tags-section h3 {
      font-size: var(--ddd-font-size-md);
      margin-bottom: var(--ddd-spacing-5);
    }

    .tags-list {
      display: flex;
      gap: var(--ddd-spacing-4);
      justify-content: center;
    }

    .tags-list .tag {
      background-color: var(--ddd-theme-default-slateMaxLight);
      padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
      border-radius: var(--ddd-radius-lg);
      cursor: pointer;
      font-size: var(--ddd-font-size-3xs);
      font-weight: var(--ddd-font-weight-bold);
      color: var(--ddd-theme-default-potentialMidnight);
      transition: background-color 0.3s;
    }

    .tags-list .tag:hover {
      background-color: var(--ddd-theme-default-potentialMidnight);
      color: var(--ddd-theme-default-slateMaxLight);
    }

    /* active (selected) tags */
    .tags-list .tag.active {
      background-color: var(--ddd-theme-default-potentialMidnight);
      color: var(--ddd-theme-default-slateMaxLight);
      font-weight: var(--ddd-font-weight-bold);
      border: 1px solid var(--ddd-theme-default-slateMaxLight);
    }

    /* reset button container */
    .reset-button-container {
      display: flex;
      justify-content: flex-end;
      margin-right: var(--ddd-spacing-3);
      margin-top: var(--ddd-spacing-3);
    }

    /* reset button */
    .reset-button {
      background-color: var(--ddd-theme-default-slateMaxLight);
      color: var(--ddd-theme-default-potentialMidnight);
      font-weight: var(--ddd-font-weight-bold);
      border: 1px solid var(--ddd-theme-default-potentialMidnight);
      border-radius: var(--ddd-radius-xs);
      padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
      font-size: var(--ddd-font-size-4xs);
      cursor: pointer;
      display: inline-block;
      transition: background-color 0.3s, color 0.3s;
    }

    .reset-button:hover {
      background-color: var(--ddd-theme-default-slateLight);
      color: var(--ddd-theme-default-potentialMidnight);
    }
    .sort-section {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: var(--ddd-spacing-3) var(--ddd-spacing-5);
    }

    /* continue button */
    .continue-button-container {
      text-align: right;
      margin-top: var(--ddd-spacing-2);
      margin-right: var(--ddd-spacing-5);
      margin-top: var(--ddd-spacing-3);
    }

    .continue-button {
      background-color: var(--ddd-theme-default-potentialMidnight);
      color: var(--ddd-theme-default-slateMaxLight);
      padding: var(--ddd-spacing-2) var(--ddd-spacing-2);
      border-radius: var(--ddd-radius-xs);
      border: 1px solid var(--ddd-theme-default-slateMaxLight);
      font-size: var(--ddd-font-size-3xs);
      font-weight: var(--ddd-font-weight-regular);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .continue-button[disabled] {
      background-color: var(--ddd-theme-default-potentialMidnight);
      color: var(--ddd-theme-default-slateMaxLight);
      border-radius: var(--ddd-radius-xs);
      border: 1px solid var(--ddd-theme-default-slateMaxLight);
      cursor: not-allowed;
    }

    /* sort label */
    .sort-section label {
      font-size: var(--ddd-font-size-3xs);
      font-weight: var(--ddd-font-weight-bold);
      margin-right: var(--ddd-spacing-2);
      color: var(--ddd-theme-default-slateMaxLight);
    }

    /* dropdown  */
    #sort-select {
      padding: var(--ddd-spacing-2);
      border: 1px solid var(--ddd-theme-default-slateLight);
      border-radius: var(--ddd-radius-sm);
      font-size: var(--ddd-font-size-3xs);
      background-color: var(--ddd-theme-default-slateMaxLight);
      color: var(--ddd-theme-default-potentialMidnight);
      cursor: pointer;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    #sort-select:focus {
      outline: none;
      border-color: var(--ddd-theme-default-potentialMidnight);
      box-shadow: 0 0 5px rgba(0, 31, 91, 0.5);
    }

    /* dashboard */
    .dashboard {
      display: flex;
      padding: var(--ddd-spacing-4);
      gap: var(--ddd-spacing-5);
      height: calc(100vh - 60px); /* height - header */
      overflow: auto;
    }

    .filters {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;
      background: var(--ddd-theme-default-slateMaxLight);
      padding: var(--ddd-spacing-4);
      border-radius: var(--ddd-radius-xs);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .filters h2 {
      margin-top: var(--ddd-spacing-0);
      font-size: var(--ddd-font-size-xs);
      border-bottom: 1px solid var(--ddd-theme-default-slateMaxLight);
      padding-bottom: var(--ddd-spacing-2);
    }

    .filters label {
      display: flex;
      align-items: center;
      gap: var(--ddd-spacing-2);
      font-size: var(--ddd-font-size-3xs);
      margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
    }

    .filters input[type="checkbox"] {
      margin: var(--ddd-spacing-0);
    }

    .filters .search-bar {
      margin-bottom: var(--ddd-spacing-4);
    }

    .filters input[type="text"] {
      width: 95%;
      padding: var(--ddd-spacing-2);
      font-size: var(--ddd-font-size-3xs);
      border: 1px solid var(--ddd-theme-default-slateMaxLight);
      border-radius: var(--ddd-radius-xs);
    }

    .cards {
      flex: 3;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* adjust card width */
      gap: var(--ddd-spacing-6);
    }

    use-case-card {
      background-color: var(--ddd-theme-default-slateMaxLight);
      border: 1px solid var(--ddd-theme-default-slateMaxLight);
      border-radius: var(--ddd-radius-xs);
      padding: var(--ddd-spacing-4);
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
      sortCriteria: { type: String },
      activeUseCase: { type: Object },
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
    this.sortCriteria = "title";
    this.activeUseCase = null;
    this.loadUseCaseData();
  }

  async loadUseCaseData() {
    try {
      const response = await fetch(
        new URL("./lib/use-case-data.json", import.meta.url).href
      );
      if (response.ok) {
      const data = await response.json();
      this.useCases = data.data.map((useCase) => ({
        ...useCase,
        imageURL: new URL(`./imgs/public/${useCase.imageURL}`, import.meta.url).href,
      }));
      this.filteredUseCases = [...this.useCases];
      this.results = this.filteredUseCases.length;
      this.uniqueTags = [
        ...new Set(this.useCases.flatMap((item) => item.tags || [])),
      ];
    }
    } catch (error) {
      console.error("Error fetching use-case data:", error);
      this.useCases = [];
      this.filteredUseCases = [];
      this.uniqueTags = [
        ...new Set(this.useCases.flatMap((item) => item.tags)),
      ];
      this.sortUseCases();
    }
  }

  filterUseCases() {
    if (this.selectedFilters.length === 0 && this.activeTags.length === 0) {
      this.filteredUseCases = this.useCases.filter((useCase) => {
        const matchesSearch = useCase.name
          .toLowerCase()
          .includes(this.searchBar.toLowerCase());
        return matchesSearch;
      });
    } else {
      this.filteredUseCases = this.useCases.filter((useCase) => {
        const matchesSearch = useCase.name
          .toLowerCase()
          .includes(this.searchBar.toLowerCase());
        const matchesFilters = this.selectedFilters.every((filter) =>
          useCase.tags?.includes(filter)
        );
        const matchesTags = this.activeTags.every((tag) =>
          useCase.tags?.includes(tag)
        );
        return matchesSearch && matchesFilters && matchesTags;
      });
    }

    this.results = this.filteredUseCases.length;
  }

  handleSortChange(event) {
    this.sortCriteria = event.target.value;
    this.sortUseCases();
  }

  resetFilters() {
    this.selectedFilters = [];
    this.activeTags = [];
    this.searchBar = "";
    this.filteredUseCases = [...this.useCases];
    this.results = this.filteredUseCases.length;
    this.activeUseCase = null; // deselect on reset
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

  handleContinue() {
    if (this.activeUseCase) {
      alert(`Selected Use Case: ${this.activeUseCase.name}`);
    }
  }

    handleUseCaseSelect(useCase) {
      if (this.activeUseCase === useCase) {
          this.activeUseCase = null;
        } else {
          this.activeUseCase = useCase;
      }
      this.requestUpdate();
      console.log('activeUseCase', this.activeUseCase)
    }


  searchUseCase(useCase) {
    this.searchBar = useCase;
    this.filterUseCases();
  }

  render() {
    return html`
      <div class="header">
        <div class="logo">
          <img
            src="https://avatars.githubusercontent.com/u/170651362?s=200&v=4"
            alt="HAX Logo"
          />
        </div>
        <div class="nav-links">
          <a>Merlin</a>
          <a>Search Sites</a>
        </div>
        <div class="account">apv5378</div>
      </div>

      <div class="new-journey">
        <h2>Pick a Journey and Start Exploring!</h2>
        <div class="use-case-examples">
          <ul>
            <li>
              <a
                href="javascript:void(0)"
                @click="${() => this.searchUseCase("Portfolio")}"
                >Portfolio Website</a
              >
            </li>
            <li>
              <a
                href="javascript:void(0)"
                @click="${() => this.searchUseCase("Course")}"
                >Course Website</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="tags-section">
        <h3>Filter by Tags</h3>
        <div class="tags-list">
          ${this.uniqueTags.map(
            (tag) => html`
              <span
                class="tag ${this.activeTags.includes(tag) ? "active" : ""}"
                @click="${() => this.handleTagClick(tag)}"
              >
                ${tag}
              </span>
            `
          )}
        </div>

        <div class="reset-button-container">
          <button @click="${this.resetFilters}" class="reset-button">
            Reset
          </button>
        </div>
      </div>

      <div class="sort-section">
        <label for="sort-select">Sort By:</label>
        <select id="sort-select" @change="${this.handleSortChange}">
          <option value="title">Title</option>
          <option value="date">Date Added</option>
        </select>
      </div>

      <div class="dashboard">
        <div class="filters">
          <h2>Templates</h2>
          <div class="search-bar">
            <input
              type="text"
              placeholder="Search templates..."
              @input="${this.handleSearchChange}"
              .value="${this.searchBar}"
            />
          </div>
          ${this.generateFilters()}
        </div>

        <div class="cards">
          ${this.filteredUseCases.map(
            (useCase) => html`
              <use-case-card
                .useCase="${useCase}"
                title="${useCase.name}"
                imageURL="${useCase.imageURL}"
                description="${useCase.description}"
                demoLink="${useCase.demo_link}"
                .selected="${this.activeUseCase === useCase}"
                @select="${() => this.handleUseCaseSelect(useCase)}"
              ></use-case-card>
            `
          )}
        </div>

        <div class="continue-button-container">
          <button
            class="continue-button"
            ?disabled="${!this.activeUseCase}"
            @click="${this.handleContinue}"
          >
            Continue
          </button>
        </div>
      </div>
    `;
  }

  generateFilters() {
    const uniqueTags = [
      ...new Set(this.useCases.flatMap((useCase) => useCase.tags || [])),
    ];
    return uniqueTags.map(
      (tag) =>
        html`<label>
          <input
            type="checkbox"
            value="${tag}"
            @change="${this.handleFilterChange}"
          />
          ${tag}
        </label>`
    );
  }

  static get tag() {
    return "use-case-dashboard";
  }
}

customElements.define(UseCaseDashboard.tag, UseCaseDashboard);
