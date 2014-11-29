var map=Array(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8);  //判断两张图片是否是一样
var user=Array();                                             //记录正确翻出图片的位置
var clickarray=Array(0, 0);                                   //记录两次点击时的方格位置
var ctr, reloadSign, finished;
var startTime=0;
var totalTime=0;

function init()
{
	if (totalTime!=0)
	{
		window.location.reload();
	}

	for (i = 0; i <16 ;i++)
 	{
		user[i] = 0;
	}

	startTime=new Date();
	ctr=0;  					  //两次点击，把不同的值给clickarray[]
	finished=0;
	scramble();
	runclk();			//计时器
	
	for (i = 0; i <16; i++) 
	{
		document.gameFrame["img"+String(i)].src ="images/image0.jpg";
    	}

}


function runclk()              				 //计时器的显示
{
	var nowTime=new Date();
	totalTime=Math.floor(nowTime.getTime()-startTime.getTime())/1000;
	document.gameFrame.timeButton.value=String(Math.floor(totalTime/3600))+':'
						+String(Math.floor(totalTime/60)%60)+':'
						+String(Math.floor(totalTime)%60%60);
	reloadSign=setTimeout("runclk()", 1000);
}

function scramble() 
{
	var temparray=Array();

	for (z = 0; z < 4; z++) 
	{
	
		for (x = 0; x <16; x++)
		{
			temparray[0] = Math.floor(Math.random()*16);
			temparray[1] = map[temparray[0]];
			temparray[2] = map[x];
			map[x] = temparray[1];
			map[temparray[0]] = temparray[2];
      		}

   	}

}


function showimage(but)   
{
	if (user[but]||startTime==0)
	{
		return;
	}

	document.gameFrame[('img'+but)].src='images/image'+map[but]+'.jpg';
	
	if (ctr==0) 
	{
		ctr=1;
		clickarray[0]=but;
		oktoclick=true;
	} 
	else 
	{
		clickarray[1]=but;
		ctr=0;
		setTimeout("returntoold()", 300);
	}

}


function returntoold()                  
{
	if ((clickarray[0]==clickarray[1]) && (!user[clickarray[0]])) // 判断鼠标两次是否点击同一个小方格，如果是以前翻出来的就算点击多少次也不翻回去
	{
  		document.gameFrame[('img'+clickarray[0])].src = "images/image0.jpg";
	} 
	else                                                            //user[cliackarray[]]表示前几步是否翻出同一张图片
	{
		if (map[clickarray[0]] != map[clickarray[1]])
		 {
			
			if (user[clickarray[0]] == 0)
			{
				document.gameFrame[('img'+clickarray[0])].src = "images/image0.jpg";
   			}
			
			if (user[clickarray[1]] == 0)
			{
				document.gameFrame[('img'+clickarray[1])].src = "images/image0.jpg";
  		    	}
	 	}
		
		if (map[clickarray[0]] == map[clickarray[1]])                              //相同的图片，显示出来
		{

			if (user[clickarray[0]] == 0&&user[clickarray[1]] == 0) 
			{
				finished++;
			}

			user[clickarray[0]] = 1;
			user[clickarray[1]] = 1;
		}
		
		if (finished >= 8)
		{
			alert("You did it in "+document.gameFrame.timeButton.value+" !");
			clearTimeout(reloadSign);
			window.location.reload()
		}

   }

}