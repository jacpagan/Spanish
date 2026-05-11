document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('verb-search');
  const rootsSelect = document.getElementById('roots');
  const translationEl = document.getElementById('translation');
  const conjugationsEl = document.getElementById('conjugations');
  const verbNames = Object.keys(verbs).sort(function (a, b) {
    return a.localeCompare(b, 'es');
  });

  let visibleVerbs = verbNames.slice();
  let currentVerb = '';

  const groupDefinitions = [
    {
      title: 'Indicative',
      keys: [
        'presentIndicative',
        'preteritIndicative',
        'imperfectIndicative',
        'futureIndicative',
        'conditionalIndicative'
      ]
    },
    {
      title: 'Perfect',
      keys: [
        'presentPerfect',
        'preteritPerfect',
        'pastPerfect',
        'futurePerfect',
        'conditionalPerfect'
      ]
    },
    {
      title: 'Continuous',
      keys: [
        'presentContinuous',
        'preteritContinuous',
        'imperfectContinuous',
        'futureContinuous',
        'conditionalContinuous'
      ]
    },
    {
      title: 'Imperative',
      keys: ['imperative']
    },
    {
      title: 'Negative Imperative',
      keys: ['negativeImperative']
    },
    {
      title: 'Subjunctive',
      keys: [
        'presentSubjunctive',
        'imperfectSubjunctive',
        'imperfectSubjunctive2',
        'futureSubjunctive'
      ]
    },
    {
      title: 'Perfect Subjunctive',
      keys: [
        'presentPerfectSubjunctive',
        'pastPerfectSubjunctive',
        'futurePerfectSubjunctive'
      ]
    }
  ];

  const tenseLabels = {
    presentIndicative: 'Present indicative',
    preteritIndicative: 'Preterite indicative',
    imperfectIndicative: 'Imperfect indicative',
    futureIndicative: 'Future indicative',
    conditionalIndicative: 'Conditional indicative',
    presentPerfect: 'Present perfect',
    preteritPerfect: 'Preterite perfect',
    pastPerfect: 'Past perfect',
    futurePerfect: 'Future perfect',
    conditionalPerfect: 'Conditional perfect',
    presentContinuous: 'Present continuous',
    preteritContinuous: 'Preterite continuous',
    imperfectContinuous: 'Imperfect continuous',
    futureContinuous: 'Future continuous',
    conditionalContinuous: 'Conditional continuous',
    imperative: 'Affirmative imperative',
    negativeImperative: 'Negative imperative',
    presentSubjunctive: 'Present subjunctive',
    imperfectSubjunctive: 'Imperfect subjunctive',
    imperfectSubjunctive2: 'Imperfect subjunctive II',
    futureSubjunctive: 'Future subjunctive',
    presentPerfectSubjunctive: 'Present perfect subjunctive',
    pastPerfectSubjunctive: 'Past perfect subjunctive',
    futurePerfectSubjunctive: 'Future perfect subjunctive'
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function filterVerbs() {
    const query = normalize(searchInput.value);

    visibleVerbs = verbNames.filter(function (verb) {
      const meaning = definitions[verb] || '';
      return (
        normalize(verb).includes(query) ||
        normalize(meaning).includes(query)
      );
    });

    const nextVerb = visibleVerbs.includes(currentVerb) ? currentVerb : visibleVerbs[0] || '';

    if (visibleVerbs.length === 0) {
      rootsSelect.disabled = true;
      rootsSelect.innerHTML = '<option value="">No verbs match this filter</option>';
      currentVerb = '';
      translationEl.innerHTML = `
        <div class="verb-summary-inner">
          <div>
            <p class="verb-label">No results</p>
            <h2 class="verb-name">Try another search</h2>
          </div>
          <p class="verb-meaning">No verb roots or meanings match "${escapeHtml(searchInput.value)}".</p>
        </div>
      `;
      conjugationsEl.innerHTML = `
        <div class="empty-state">
          <strong>No matching verbs.</strong> Clear the filter or type a different root.
        </div>
      `;
      return;
    }

    rootsSelect.disabled = false;
    rootsSelect.innerHTML = visibleVerbs.map(function (verb) {
      return `<option value="${escapeHtml(verb)}"${verb === nextVerb ? ' selected' : ''}>${escapeHtml(verb)}</option>`;
    }).join('');

    currentVerb = nextVerb;
    rootsSelect.value = nextVerb;
    renderVerb(nextVerb);
  }

  function renderVerb(verbName) {
    const rootVerb = verbs[verbName];
    const meaning = definitions[verbName] || 'No translation available.';

    if (!rootVerb) {
      translationEl.innerHTML = `
        <div class="verb-summary-inner">
          <div>
            <p class="verb-label">Select a verb</p>
            <h2 class="verb-name">Nothing selected</h2>
          </div>
          <p class="verb-meaning">Choose a verb from the list to see its conjugations.</p>
        </div>
      `;
      conjugationsEl.innerHTML = '<div class="empty-state">Choose a verb to see conjugations.</div>';
      return;
    }

    currentVerb = verbName;
    translationEl.innerHTML = `
      <div class="verb-summary-inner">
        <div>
          <p class="verb-label">Selected verb</p>
          <h2 class="verb-name">${escapeHtml(verbName)}</h2>
        </div>
        <p class="verb-meaning">${escapeHtml(meaning)}</p>
      </div>
    `;

    conjugationsEl.innerHTML = groupDefinitions
      .map(function (group) {
        const rows = group.keys
          .filter(function (key) {
            return Object.prototype.hasOwnProperty.call(rootVerb, key);
          })
          .map(function (key) {
            return `
              <tr>
                <th scope="row">${escapeHtml(tenseLabels[key] || key)}</th>
                <td>${escapeHtml(rootVerb[key].join(', '))}</td>
              </tr>
            `;
          })
          .join('');

        if (!rows) {
          return '';
        }

        return `
          <section class="tense-group">
            <h3>${escapeHtml(group.title)}</h3>
            <div class="table-responsive">
              <table class="table align-middle">
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>
          </section>
        `;
      })
      .filter(Boolean)
      .join('');
  }

  searchInput.addEventListener('input', filterVerbs);

  rootsSelect.addEventListener('change', function () {
    if (!this.value) {
      return;
    }

    currentVerb = this.value;
    renderVerb(this.value);
  });

  filterVerbs();
});
