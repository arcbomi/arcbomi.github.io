function updateScale() {
    const screenWidth = window.innerWidth;
    const scaleFactor = 1.6 + screenWidth /3600;
    const timetbElements = document.querySelectorAll('.timetb');

    timetbElements.forEach((element) => {
      element.style.transform = `scale(${scaleFactor})`;
    });
  }

  window.addEventListener('load', updateScale);
  window.addEventListener('resize', updateScale);


  
  var csvData,gradesData;
  var dayNames = ['Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма', 'Сенбі', 'Жексенбі'];




  function readFiles(class_number) {
    var listItems = document.querySelectorAll(".grades ul li a");
    removeEventListeners(listItems);
    removeAllElementsInUl();

    var csvFilePath = 'timetb_data/' + class_number + '.csv';
    var txtFilePath = 'class_name/' + class_number + '.txt';

    // 读取 CSV 文件
    $.ajax({
        type: "GET",
        url: csvFilePath,
        dataType: "text",
        success: function(data) {
          csvData = $.csv.toArrays(data);
        }
    });

    // 读取文本文件
    $.ajax({
        type: "GET",
        url: txtFilePath,
        dataType: "text",
        success: function(data) {
          gradesData = data.split(" ");
          var parentElement = document.querySelector(".grades ul");
          gradesData.forEach(function(item) {
              var listItem = document.createElement("li");
              var link = document.createElement("a");
              link.href = "#"; // 设置链接的 href 属性，或者您也可以设置为实际的链接地址
              link.textContent = item;
              listItem.appendChild(link); // 将 <a> 元素添加到 <li> 元素中
              parentElement.appendChild(listItem);

              var listItems = document.querySelectorAll(".grades ul li a");
              // 为每个 <a> 元素添加点击事件监听器
              listItems.forEach(function(item) {
                  item.addEventListener("click", function(event) {
                      event.preventDefault(); // 阻止默认链接点击行为
                      // 获取被点击的 <a> 元素的文本内容
                      var text = this.textContent;
                      // 调用函数 changeGrade(text)
                       // 更新 Swiper 实例
                     // 更新 Swiper 的幻灯片
                      delAllTable();
                      changeGrade(text);
                      delAllSpaceTd();
                      swiper.update();
                      updateScale()
                  });
              });
          });
        }
    });
}
// 示例调用
readFiles(7); // 调用以读取 class_number 为 7 的文件

function getGradeRow(text)
{
  return gradesData.indexOf(text)*10;
}

function getGradeIndex(text)
{
  return gradesData.indexOf(text);
}

function rBr(str) {
  var lastSpaceIndex = str.lastIndexOf(' ');
  if (lastSpaceIndex !== -1) {
      return str.slice(0, lastSpaceIndex) + '<br>' + str.slice(lastSpaceIndex + 1);
  }
  return str;
}


function changeGrade(text) {
  var gradeRow=getGradeRow(text);
var htmlContent = ``;
  for(var i=0;i<5;i++)
  {
    //console.log(csvData[i])
      htmlContent+=`
      <div class="swiper-slide">
          <table class="timetb">
          <caption>${dayNames[i]}</caption>
              <tr>
                  <td>${rBr(csvData[0+gradeRow][i])}</td>
                  <td class="time">8.00<br> 8.45</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[1+gradeRow][i])}</td>
                  <td class="time">8.50<br> 9.35</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[2+gradeRow][i])}</td>
                  <td class="time">9.50<br> 10.35</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[3+gradeRow][i])}</td>
                  <td class="time">10.40<br> 11.25</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[4+gradeRow][i])}</td>
                  <td class="time">11.45<br> 12.30</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[5+gradeRow][i])}</td>
                  <td class="time">12.35<br> 13.20</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[6+gradeRow][i])}</td>
                  <td class="time">13.40<br> 14.25</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[7+gradeRow][i])}</td>
                  <td class="time">14.30<br> 15.15</td>
              </tr>
              <tr>
                  <td>${rBr(csvData[8+gradeRow][i])}</td>
                  <td class="time">15.40<br> 16.25</td>
              </tr>
          </table>
      </div>
      `
    }
// 将 HTML 内容插入到 .swiper-wrapper 元素中
var swiperWrapper = document.querySelector('.swiper-wrapper');
swiperWrapper.insertAdjacentHTML('beforeend', htmlContent);

}



function delAllTable()
{
  // 获取所有的 .swiper-slide 元素
  var slides = document.querySelectorAll('.swiper-slide');

  // 从第二个开始循环删除元素
  for (var i = 1; i < slides.length; i++) {
      slides[i].parentNode.removeChild(slides[i]);
  }
}

function removeEventListeners(listItems) {
  listItems.forEach(function(item) {
      var clone = item.cloneNode(true); // Create a deep clone of the element
      item.parentNode.replaceChild(clone, item); // Replace the original element with the clone
  });
}


function delAllSpaceTd()
{
// 获取所有的 <tr> 元素
var trElements = document.querySelectorAll('.swiper-slide tr');

// 循环遍历每个 <tr> 元素
trElements.forEach(function(trElement) {
    // 获取当前 <tr> 元素中的第一个 <td> 元素
    var firstTdElement = trElement.querySelector('td:first-child');
    
    // 检查第一个 <td> 元素是否为空
    if (firstTdElement && firstTdElement.textContent.trim() === '') {
        // 如果为空，则删除当前 <tr> 元素
        trElement.parentNode.removeChild(trElement);
    }
});
}

function removeAllElementsInUl() {
  var ulElement = document.querySelector(".grades ul");
  if (ulElement) {
      ulElement.innerHTML = ""; // Set the innerHTML of the ul to an empty string
  } else {
      console.error("No ul element with class 'grades' found.");
  }
}


