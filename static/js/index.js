function collerClick() {
    console.log(window.location.pathname);
    $('#cooler').append('<div>Dig it</div>');
}

// dont need to sdn stuff as post due to cookies
function getNextRow()
{
    let data = {

    };

    let xReq = new XMLHttpRequest();
    xReq.onreadystatechange = displayNewRow;

    xReq.open('POST',window.location.pathname + '/get_next_arr',true);
    xReq.setRequestHeader('data', JSON.stringify(data));
    xReq.send(); 
}

function displayNewRow()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let rowArrs = JSON.parse(this.responseText).arr;
        let rowWidth = 200/(rowArrs.length); //need to change to better

        new Promise((resolve, reject) => {
            var html = '<div class="arr-holder">';
            for(var i = 0; i < rowArrs.length; i++) {
                html += '<div class="arr-row" style="width:' + rowWidth + '%;">';
                
                var temp = rowArrs[i];
                for(var j = 0; j < temp.length; j++) {
                    if(j == 0) {
                        if(temp.length == 1) {
                            html += '<button class="arr arr-single" exp-val="' + temp[j] + '">' + temp[j] + '</button>';
                        } else {
                            html += '<button class="arr arr-start" exp-val="' + temp[j] + '">' + temp[j] + '</button>';
                        }
                    } else if (j == temp.length - 1) {
                        html += '<button class="arr arr-end" exp-val="' + temp[j] + '">' + temp[j] + '</button>';
                    } else {
                        html += '<button class="arr" exp-val="' + temp[j] + '">' + temp[j] + '</button>';
                    }
                }

                html += '</div>';

                if (i + 1 == rowArrs.length) {
                    resolve(html + '</div>');
                }
            }
        }).then((newRow) => {
            $('#gameboard').append(newRow);
        });
    }
}
/* 
function formatRow(items) {
    div.arr-holder
            div.arr-row
                each val, index in algArray
                    if index == 0
                        button.arr.arr-start(exp-val=val)= val
                    else if index == algArray.length - 1
                        button.arr.arr-end(exp-val=val)= val
                    else
                        button.arr(exp-val=val)= val
    return new Promise((resolve, reject) => {
        for(var i = 0; i < items.length)
    });
} */
 