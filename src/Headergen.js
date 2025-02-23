function MakeTabs(txt){
	JsonParsed = JSON.parse(txt)
	let NavItem = document.getElementsByTagName("nav").item(0)
	if (NavItem == null){
		return
	}
	let Current = document.getElementById("Selected")
	let PageName = ""
	if (Current != null){
		PageName = Current.innerText.trim()
	}
	for (const Name in JsonParsed){
		let Ref = JsonParsed[Name].href
		let Insertion = document.createElement("a")
		if (Name == PageName){
			Insertion.className = "Selected"
		}
		Insertion.innerText = Name
		Insertion.href = Ref
		NavItem.insertAdjacentElement("beforeend",Insertion)
	}
}

fetch("data/Headertabs.json").then(Doc => {
	Doc.text().then(MakeTabs)
})