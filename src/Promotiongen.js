async function GetJSONPromos(){
	let Returnable
	Returnable = await fetch("data/DayPromotions.json")
	Returnable = await Returnable.text()
	return JSON.parse(Returnable)
}

function PopulateConstruct(Cons,Txt1,Txt2){
	let Header = document.createElement("h3")
	let Contents = document.createElement("p")
	Header.textContent = Txt1
	Contents.textContent = Txt2
	Cons.insertAdjacentElement("beforeend",Header)
	Cons.insertAdjacentElement("beforeend",Contents)
}

function ColorConstruct(Cons, ConsDay, CurrentDay){
	if (ConsDay == CurrentDay){
		if (ConsDay > 0 && ConsDay < 4){
			Cons.style.backgroundColor = "rgb(255, 116, 116)"
			Cons.style.color = "white"
		} else {
			Cons.style.backgroundColor = "lightgreen"
		}
	}
}

function FillConstructs(ConsList,Head,Body,ItemNo,Day){
	for (let ind = 0; ind < ConsList.length; ind++){
		PopulateConstruct(ConsList.item(ind),Head,Body)
		ColorConstruct(ConsList.item(ind),ItemNo,Day)
	}
}

async function GenProms(){
	const DateGen = new Date()
	let Day = DateGen.getDay()
	let JSONDays = await GetJSONPromos()

	// Populate week
	let WeekContainers = document.getElementsByClassName("Week")
	for (let ind = 0; ind < WeekContainers.length; ind++){
		let WeekBar = WeekContainers.item(ind)
		let i = 0
		for(const Index in JSONDays){
			const Value = JSONDays[Index]
			let Construct = document.createElement("div")
			Construct.className = "FlexItem"
			PopulateConstruct(Construct,Index,Value)
			ColorConstruct(Construct,i,Day)
			WeekBar.insertAdjacentElement("beforeend",Construct)
			i++
		}
	}

	let YesterdayInd = Day - 1 > 0? Day-1 : 6
	let TomorrowInd = Day + 1 > 6? 0 : Day + 1
	
	let i = 0
	for(const Index in JSONDays){
		const Value = JSONDays[Index]
		if (i == YesterdayInd){
			FillConstructs(document.getElementsByClassName("Yesterday"), Index,Value,i,Day)
		} else if (i == Day){
			FillConstructs(document.getElementsByClassName("Today"), Index,Value,i,Day)
		} else if (i == TomorrowInd){
			FillConstructs(document.getElementsByClassName("Tomorrow"), Index,Value,i,Day)
		}
		i++
	}
}

GenProms()