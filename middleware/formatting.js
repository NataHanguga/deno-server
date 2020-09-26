const positionFormatting = result => {
  return {
    id: result._id,
    name: result.name,
    amount: result.amount,
    percent: result.percent || null,
    rate: result.rate ? rateFormatting(result.rate) : null
  }
}

const rateFormatting = result => {
  return {
    id: result._id,
    rate: result.rate,
    money: result.money,
    title: result.title
  }
}

const departmentHeadFormatting = result => {
  return {
    id: result._id,
    percent: result.percent,
    teacherName: result.teacherName.name
  }
}

const pedagogicTitleFormating = result => {
  return {
    id: result._id,
    percent: result.percent,
    title: result.title
  }
}

const teacherFormatting = result => {
  return {
    id: result._id,
    name: result.name,
    education: result.education,
    year: result.year,
    expiriense: result.expiriense,
    teachHours: result.teachHours,
    concertHours: result.concertHours,
    pedagogicTitle: result.pedagogicTitle 
      ? pedagogicTitleFormating(result.pedagogicTitle)
      : null,
    rate: result.rate ? rateFormatting(result.rate) : null,
    managerPosition: result.managerPosition 
      ? positionFormatting(result.managerPosition)
      : null,
    departmentHead: result.departmentHead 
      ? departmentHeadFormatting(result.departmentHead)
      : null
  }

}

module.exports = { 
  positionFormatting, 
  rateFormatting, 
  departmentHeadFormatting,
  pedagogicTitleFormating,
  teacherFormatting
}