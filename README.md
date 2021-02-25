# delavega-lib v 0.1.0

Librabry based on litElements that provides the following components:

## DropDown (<delavega-dropdown/>)
Collection of values selector

### defaultEmptyValue     (Boolean)
Selectable empty value fot he selector. If true, the default empty value could be selected

### defaultEmptyValueText (String - default: 'None')
if defaultEmptyValue is true, the text to be displayed for 

### data                  (Array)
Array of objects with the dropdown options. By default, the display text property is text and
value for the selector value: 

```javascript
  const data = [
      {text : 'David', value : 1},
      {text : 'Luis', value: 2}
    ];

```

### textProperty          (String)
It changes the default 'text' property to display into the selector.
For example, you could change it for name:

```javascript
  const data = [
      {name : 'David', value : 1},
      {name : 'Luis', value: 2}
    ];

```

### valueProperty         (String)
It changes the default 'value' property which cointains the identificator
for each option. For example, id:

```javascript
  const data = [
      {name : 'David', id : 1},
      {name : 'Luis', id: 2}
    ];

```

### value                 (String)
Referred to the value you want to be selected

## Table (<delavega-table/>)
A table component to render data received in the **data** attribute. It needs the <delavega-table-column> to render
each row. It will be displayed as a HTML Table in devices with large screes, and in a cards format for mobile ones.

### loading                  (Boolean)
For the asynchronous loads, when it is true, a loading text will be displayed 


### data                  (Array)
Array of objects to be displayed. The grid will know the values to be rendered throw the columns configuration. For example,

for this collection:

```javascript
const data = [
    {
        "tier"   : "I" ,
        "match"  : "5 numbers + 2 euronumbers" ,
        "winners": "0x" ,
        "amount" : "1000000"
    } ,
    {
        "tier"   : "II" ,
        "match"  : "5 numbers + 1 euronumbers" ,
        "winners": "3x" ,
        "amount" : "1000"
    } ,
    {
        "tier"   : "III" ,
        "match"  : "5 numbers" ,
        "winners": "3x" ,
        "amount" : "10000"
    } ,
    {
        "tier"   : "IV" ,
        "match"  : "4 numbers + 1 euronumbers" ,
        "winners": "13x" ,
        "amount" : "100000"
    }
]
```

This could be the columns definition

```javascript
  render() {
    ``return html`<delavega-table data="${data}">``
        <delavega-table-column
            header="Tier"
            dataIndex="tier"
        />
        <delavega-table-column
            header="Match"
            dataIndex="match"
        />
        <delavega-table-column
            header="Winners"
            dataIndex="winners"
        />
        <delavega-table-column
            header="Amount"
            type="currency" //column type. It will show the currency in the cell renderer
            dataIndex="amount"
        />
    ``</delavega-table>`;``
```


```javascript
  const data = [
      {text : 'David', value : 1},
      {text : 'Luis', value: 2}
    ];

```

## TableColumn (<delavega-table-column/>)
As we see above, it is the element the Table element uses to render columns and their data. It has the following properties:

### dataIndex          (String)
The property name of each record used to get the value from this record and renderer it in the cell

### header          (String)
The text which be displayed in the head of the Table element, according to its dataIndex

### type          (String)
To display different kinds of values. Currently, the only supported type is **currency**, with the **€** default value