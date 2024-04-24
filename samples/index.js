let allSamples = [];
let allTags = [];
let visibleSamples = [];

document.addEventListener('DOMContentLoaded', (event) => {
  initArrs();
  changeHash();
});
window.addEventListener('hashchange', (event) => changeHash());

function initArrs() {
  // use arrays so we can sort, filter, forEach, etc
  allSamples = [...document.getElementById('samplesDiv').children];
  allTags = [...document.getElementById('sidenavList').children];
  allTagNames = [...allTags.map((t) => t.dataset.name)];
  visibleSamples = [...allSamples];
}

function changeHash() {
  filterSamples();
  filterTags();
}

function filterSamples() {
  const hash = window.location.hash.substring(1).split(',');
  if (hash.length === 1 && hash[0] === '') {
    allSamples.forEach((s) => s.classList.remove('hidden'));
    visibleSamples = [...allSamples];
    return;
  }
  visibleSamples.length = 0;
  for (let i = 0; i < allSamples.length; i++) {
    const sampleElt = allSamples[i];
    sampleElt.classList.remove('hidden');
    const sampleTags = sampleElt.dataset.tags.split(',');
    if (hash.every((t) => sampleTags.includes(t) || !allTagNames.includes(t))) visibleSamples.push(sampleElt);
    else sampleElt.classList.add('hidden');
  }
}

function filterTags() {
  // count tags
  const tagCounts = new Map();
  for (let i = 0; i < visibleSamples.length; i++) {
    const sampleTags = visibleSamples[i].dataset.tags.split(',');
    for (let j = 0; j < sampleTags.length; j++) {
      const tag = sampleTags[j];
      const count = tagCounts.get(tag) ?? 0;
      tagCounts.set(tag, count + 1);
    }
  }

  const checkedTags = [];
  const hash = window.location.hash.substring(1).split(',');

  for (let i = 0; i < allTags.length; i++) {
    const tagElt = allTags[i];
    if (tagElt.dataset.name === 'all') {
      tagElt.lastElementChild.innerHTML = `(${allSamples.length})`;
      continue;
    }
    tagElt.classList.remove('hidden');
    const cbElt = tagElt.firstElementChild;
    cbElt.checked = false;
    for (let j = 0; j < hash.length; j++) {
      const hashtag = hash[j];
      if (tagElt.dataset.name === hashtag) {
        cbElt.checked = true;
        checkedTags.push(tagElt);
      }
    }
    const ctElt = tagElt.lastElementChild;
    const ct = tagCounts.get(tagElt.dataset.name);
    if (ct === undefined || ct <= 0) {
      tagElt.classList.add('hidden');
    } else {
      if (cbElt.checked) {
        tagElt.href = `#${[...hash].filter((t) => tagElt.dataset.name !== t).join(',')}`;
        ctElt.innerHTML = '';
      } else {
        tagElt.href = `#${hash.length === 1 && hash[0] === '' ? '' : `${hash.join(',')},`}${tagElt.dataset.name}`;
        ctElt.innerHTML = `(${ct})`;
      }
    }
  }

  // can't sort HTMLCollection
  allTags
    .sort((a, b) => {
      const nameA = a.dataset.name;
      const nameB = b.dataset.name;

      if (nameA === 'all') return -1;
      if (nameB === 'all') return 1;
      if (checkedTags.includes(a) && !checkedTags.includes(b)) return -1;
      if (checkedTags.includes(b) && !checkedTags.includes(a)) return 1;
      return 0;
    })
    .forEach((elt) => elt.parentNode.appendChild(elt));
}
