export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 4;
    this.page = page;
    this.mongooseQuery.skip(skip).limit(4);
    return this;
  }
  filter() {
    let filterObje = { ...req.query };
    let exculedQuery = ["page", "sort", "keyword", "fields"];
    exculedQuery.forEach((ele) => {
      delete filterObje[ele];
    });
    filterObje = JSON.stringify(filterObje);
    filterObje = filterObje.replace(
      /\bgt|gte|lt|lte\b/g,
      (match) => `$${match}`
    );
    filterObje = JSON.parse(filterObje);
    this.mongooseQuery.find(filterObje)
    return this;
  }
  sort(){
    if(this.queryString.sort){
        let sortBy = req.query.sort.split(",").join(" ")
        this.mogooseQuery.sort(sortBy)
      }
      return this
  }
  search(){
    if(this.queryString.keyword){
        this.mogooseQuery.find({
          $or:[{title :{$regex:req.query.keyword,$options:"i"}},{title :{$regex:req.query.keyword,$options:"i"}}]
        })
      }
  }
  fields(){
    if(this.queryString.fields){
        let fields = this.queryString.fields.split(",").join(" ")
        this.mogooseQuery.select(fields)
      }
      return this;
  }
}
