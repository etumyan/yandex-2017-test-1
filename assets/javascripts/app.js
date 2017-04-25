/*----------------------------------------------*\
  Core project scripts and helpers
\*----------------------------------------------*/

const lectureList = document.querySelectorAll('.js-lecture-list-item');
const filterParams = {};

// Filter main function
function filterApply() {
  let lectureListFiltered = [...lectureList].filter((element) => {
    let _accepted = true;
    for(filterParam in filterParams) {
      _accepted = element.dataset[filterParam].split(',')
                  .map((item) => item.trim())
                  .indexOf(filterParams[filterParam]) != -1;
      if(!_accepted) {
        break;
      }
    }
    return _accepted;
  });

  hide(lectureList);
  lectureListFiltered.length ? show(lectureListFiltered)
                             : show(document.querySelectorAll('#js-lecture-list-empty'));
  return false;
}

function filterAddParam() {
  const element = document.createElement('span');
  element.className = 'js-filter-param-list-item tag';
  element.dataset.type = this.dataset.type;
  element.onclick = function() {
    filterRemoveParam.call(this);
  };
  element.append(this.textContent);
  document.getElementById('js-filter-param-list').append(element);

  filterParams[this.dataset.type] = this.textContent;

  // Show filter block if some params provided
  if(document.querySelectorAll('.js-filter-param-list-item').length > 0) {
    show(document.querySelectorAll('#js-filter'));
  }

  return filterApply();
}

function filterRemoveParam() {
  this.remove();
  delete filterParams[this.dataset.type];

  // Hide filter block if no params provided
  if(document.querySelectorAll('.js-filter-param-list-item').length < 1) {
    hide(document.querySelectorAll('#js-filter'));
  }

  return filterApply();
}

function show(elements) {
  elements.forEach((element) => {
    element.style.display = 'block';
  });
  return false;
}

function hide(elements) {
  elements.forEach((element) => {
    element.style.display = 'none';
  });
  return false;
}

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-filter-param-list-item').forEach((element) => {
      filterParams[element.dataset.type] = element.dataset.value;
    });
    filterApply();
  });
}());
