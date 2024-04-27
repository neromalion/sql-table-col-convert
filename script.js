const fileLoaderSql = document.getElementById('fileLoaderSql');
const fileLoaderTable = document.getElementById('fileLoaderTable');

const tableAll = document.querySelectorAll('.file-list, .table-list');
const tableSql = document.querySelector('#tableSql');
const tableCol = document.querySelector('#tableCol');
const sqlBefore = document.getElementById('sqlBefore');

//toggle all
const ToggleAll = (TABLE) => {
  let headChkbox = TABLE.querySelector('thead input[type=checkbox]');
  let bodyChkboxes = TABLE.querySelectorAll('tbody input[type=checkbox]');

  headChkbox.addEventListener('change', () => {
    [...bodyChkboxes].map((i) => (i.checked = headChkbox.checked));
  });
};

const DeleteRow = (e) => {
  let row = e.parentNode.parentNode;
  row.parentNode.removeChild(row);
};

const DeleteAllRow = (TABLE) => {
  let delAllBtn = TABLE.querySelector('thead .btn-del-all');

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
  DeleteAllRow(e);
});

//file read
const ReadFile = (TABLE, ENCODING) => {
  const READER = new FileReader();
  const FILENAME = event.target.files[0].name;

  READER.readAsText(event.target.files[0], ENCODING); //파일읽기
  READER.onload = function () {
    //읽기완료
    AddTable(READER, FILENAME, TABLE);
  };
  event.target.value = '';
};

//file set
const AddTable = (CONTENT, FILENAME, TABLE) => {
  let newRow = document.createElement('tr');
  let tableBody = TABLE.querySelector('tbody');
  newRow.innerHTML =
    `
    <td><input type="checkbox" /></td>
    <td>` +
    FILENAME +
    `</td>
    <td>
      <button class="btn-del" onclick="DeleteRow(this)">
        <span class="lets-icons--dell-duotone"></span>
      </button>
    </td>
  `;

  tableBody.appendChild(newRow);
};
// add event listener
fileLoaderSql.addEventListener('change', () => ReadFile(tableSql, 'UTF-8'));
fileLoaderTable.addEventListener('change', () => ReadFile(tableCol, 'UTF-8'));
