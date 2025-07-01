export const aboutExport = (
  <>
    <h1 style={{ marginBottom: '1rem' }}>Portability🔓</h1>
    <p>You can export individual lists or all lists at once.</p>
    <p style={{ marginBottom: '2rem' }}>
      All your saved knowledge stays in your hands — you're never locked into this app. ❤
    </p>

    <h1 style={{ marginBottom: '1rem' }}>Export Formats💾</h1>
    <div style={{ lineHeight: '1.6' }}>
      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>1) .txt</b> – A simple plain text format.
        <br />
        Can be opened with any basic text editor.
      </p>

      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>2) .json</b> – For advanced users who know their way
        around structured data.
      </p>

      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>3) .csv</b> – Spreadsheet-friendly format.
        <br />
        Can be opened with any spreadsheet software like Google Sheets or Excel.
      </p>

      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>4) Google Sheets</b> – Save your list directly to your
        Google Sheets account.
      </p>
    </div>
  </>
);

export const aboutImport = (
  <>
    <h1 style={{ marginBottom: '1rem' }}>Import 📦</h1>
    <p style={{ marginBottom: '2rem' }}>
      You can upload your own word list. <br /> Up to <b>10,000</b> words per list.⚠️
    </p>
    <h1 style={{ marginBottom: '1rem' }}>Supported Formats 🎯</h1>
    <p style={{ marginBottom: '2rem' }}>txt, json, csv, google sheets, (ctrl + v)</p>
    <h1 style={{ marginBottom: '1rem' }}>Formats Structure 🧩</h1>
    <div style={{ lineHeight: '1.8' }}>
      {/* TXT */}
      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>1) .txt</b> – Simple text format. <br />
        word or phrase → : (colon) → meaning
      </p>
      <p>Example:</p>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: 'fit-content',
          padding: '12px 30px',
          border: '2px dotted rgb(129, 129, 129)',
          fontFamily: 'monospace',
        }}
      >
        word: translate
        <br />
        hello: привет
      </div>
      <p>(Download sample .txt file)</p>
      {/* JSON */}
      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>2) .json</b> – Structured text format. <br />
        {'{'} <b style={{ opacity: '0.7' }}> (brace at the beginning of the file)</b> →<br /> "word or phrase"
        <b style={{ opacity: '0.7' }}>(in quotes) </b> →<br /> : <b style={{ opacity: '0.7' }}>(colon)</b> →<br />
        "meaning"
        <b style={{ opacity: '0.7' }}>(in quotes) </b> →<br />,<b style={{ opacity: '0.7' }}>(comma) </b> →<br />
        {'}'} <b style={{ opacity: '0.7' }}> (brace at the end of the file)</b>
        <br />
        <p>&nbsp;&nbsp;The comma is not placed on the last line ⚠️</p>
      </p>
      <p>Example:</p>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: 'fit-content',
          padding: '12px 30px',
          border: '2px dotted rgb(129, 129, 129)',
          fontFamily: 'monospace',
        }}
      >
        {'{'} <br />
        &ensp;"word": "translate",
        <br />
        &ensp;"hello": "привет"
        <br />
        {'}'}
      </div>
      <p>(Download sample .json file)</p>
      {/* CSV */}
      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>3) .csv</b> – Spreadsheet format.
        <br />
        Two columns: word | translation.
      </p>
      <p>Example:</p>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: 'fit-content',
          padding: '12px 30px',
          border: '2px dotted rgb(129, 129, 129)',
          fontFamily: 'monospace',
        }}
      >
        word | translate
        <br />
        word | translate
      </div>
      <p>(Download sample .csv file)</p>
      {/* Google Sheets */}
      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>4) Google Sheets</b> – Upload from your Google Sheets
        directly.
      </p>
      <p>Same structure as .csv (word in column A, translation in column B).</p>
    </div>
    <h1 style={{ marginBottom: '1rem' }}>List name 📗</h1>
    <p>The list will be named after the file name</p>
  </>
);
<>
  {/* <h1 style={{ marginBottom: '1rem' }}>Import📦</h1>
    <p>Вы можете загрузить свой список слов.</p>
    <p style={{ marginBottom: '2rem' }}>до 10 000 слов в одном списке.⚠️</p>

    <h1 style={{ marginBottom: '1rem' }}>форматы и струтура🧩</h1>
    <div style={{ lineHeight: '1.6' }}>
      <p>
        <h2 style={{ textShadow: '1px 1px 0.1px white' }}>1) .txt</h2>
        A simple plain text format.
        <br />
        Can be opened with any basic text editor.
      </p>
      <p style={{ textShadow: '1px 1px 0.1px white' }}>структура :</p>
      слово или фраза → : (двояточие) →<br /> значение → слудующая строка →
      <p style={{ textShadow: '1px 1px 0.1px white' }}>структура example:</p>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: 'fit-content',
          padding: '12px 30px',
          border: '2px dotted rgb(129, 129, 129)',
        }}
      >
        word: translate <br />
        word: translate <br />
      </div>
      <p>( скачать .txt прмиер )</p>
      <p>
        <h2 style={{ textShadow: '1px 1px 0.1px white' }}>2) .json</h2>
        For advanced users who know their way around structured data.
      </p>
      <p style={{ textShadow: '1px 1px 0.1px white' }}>структура :</p>
      {'{'} (Отрытая фигурная скобка, только в самом начале файла❗) →<br />
      слово или фраза, (в двойных ковычках - ") →<br /> : (двояточие) →<br /> значение (в двойных ковычках - ") →
      <br />
      , (запятая) →<br /> слудующая строка →<br />
      {'}'} (Закртая фигурная скобка, только в самом конце файла❗) →<br />
      <p style={{ textShadow: '1px 1px 0.1px white' }}>структура example:</p>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: 'fit-content',
          padding: '12px 30px',
          border: '2px dotted rgb(129, 129, 129)',
        }}
      >
        {`{`} <br />
        &ensp; &ensp;{`"word": "translate",`} <br />
        &ensp; &ensp;{`"word": "translate"`} <br />
        {`}`}
      </div>
      <p>( скачать .json прмиер )</p>
      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>3) .csv</b> – Spreadsheet-friendly format.
        <br />
        Can be opened with any spreadsheet software like Google Sheets or Excel.
      </p>
      <p style={{ textShadow: '1px 1px 0.1px white' }}>структура :</p>
      <p>
        first column - слово или фраза
        <br />
        second - значение
      </p>
      <p>( скачать .csv прмиер )</p>
      <p>
        <b style={{ textShadow: '1px 1px 0.1px white' }}>4) Google Sheets</b> – Save your list directly to your
        Google Sheets account.
      </p>
      <p style={{ textShadow: '1px 1px 0.1px white' }}>структура :</p>
      <p>same like .csv</p>
    </div> */}
</>;
