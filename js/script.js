const inputSql = document.getElementById('inputSql');
const inputConvert = document.getElementById('inputConvert');

const tableAll = document.querySelectorAll('.file-table, .convert-table');
const tableSql = document.querySelector('#tableSql');
const tableConvert = document.querySelector('#tableConvert');

const txtareaSql = document.getElementById('txtareaSql');

let sqlFiles = {};
let colFiles = {};

//toggle all
const ToggleAll = (TABLE) => {
  const headChk = TABLE.querySelector('thead input[type=checkbox]');
  const bodyChk = TABLE.querySelectorAll('tbody input[type=checkbox]');

  headChk.addEventListener('change', () => {
    [...bodyChk].map((i) => (i.checked = headChk.checked));
  });
};

const DelRow = (e) => {
  const row = e.parentNode.parentNode;
  row.parentNode.removeChild(row);
};

const DelAllRow = (TABLE) => {
  let delAllBtn = TABLE.querySelector('thead .delete-all-button');

  delAllBtn.addEventListener('click', () => {
    let Chkboxes = TABLE.querySelectorAll('tbody input[type=checkbox]');
    [...Chkboxes].map((i) => {
      if (i.checked) i.closest('tr').remove();
    });
  });
};

//set file table function
[...tableAll].map((e) => {
  ToggleAll(e);
  DelAllRow(e);
});

//file read
const ReadFile = (TABLE, STORAGE, ENCODING) => {
  let busyReading = false;

  const inputFiles = [...event.target.files];
  inputFiles.map((FILE) => {
    if (!busyReading) {
      const READER = new FileReader();
      READER.readAsText(FILE, ENCODING); //파일읽기
      READER.onloadstart = function () {
        busyReading = true;
      };
      READER.onload = function () {
        //읽기완료
        AddTable(FILE.name, TABLE);
        STORAGE[FILE.name] = READER.result;
        busyReading = false;
      };
    }
  });

  event.target.value = '';
};

//file set
const AddTable = (FILENAME, TABLE) => {
  const newRow = document.createElement('tr');
  const tableBody = TABLE.querySelector('tbody');
  newRow.innerHTML = `
    <td><input type="checkbox" /></td>
    <td onclick="LoadFile()">${FILENAME}</td>
    <td>
      <button class="delete-button" onclick="DelRow(this)">
        <span class="lets-icons--dell-duotone"></span>
      </button>
    </td>
  `;

  tableBody.appendChild(newRow);
};

const LoadFile = () => {
  const filename = event.target.innerText;
  txtareaSql.innerHTML = sqlFiles[filename];
};

// add event listener
inputSql.addEventListener('change', () => ReadFile(tableSql, sqlFiles, 'UTF-8'));
inputConvert.addEventListener('change', () => ReadFile(tableConvert, colFiles, 'UTF-8'));