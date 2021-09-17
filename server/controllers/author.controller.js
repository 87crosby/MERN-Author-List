const Author = require("../models/author.model");



module.exports.findAllAuthors = (req,res)=>{
    Author.find()
        .then(allAuthors=>{
            res.json({results: allAuthors})
        })
        .catch(err=>{
            res.json({err:err})
        })
}


module.exports.createNewAuthor = (req,res)=>{
    Author.create(req.body)
        .then(newAuthorObj=>{
            res.json({results: newAuthorObj })
        })
        .catch(err=>{
            res.json({err:err})
        })
}

module.exports.findOneAuthor = (req,res)=>{
    
    Author.findOne({_id:req.params.id})
        .then(foundAuthor=>{
            res.json({results: foundAuthor })
        })
        .catch(err=>{
            res.json({err:err})
        })
}


module.exports.updateExistingAuthor = (req, res) => {
    Author.findOneAndUpdate(
        { _id: req.params.id }, //find the objects whose _id == req.params.id
        req.body, //req.body is the information from the form to update with
        { new: true, runValidators: true } //new:true means return the newly updated info. 
    )
        .then(updatedAuthor => {
            res.json({ results: updatedAuthor })
        })
        .catch(err=>{
            res.json({err:err})
        })
        
}

module.exports.deleteAuthor = (req,res)=>{
    Author.deleteOne({_id: req.params.id})
        .then(deletedAuthor =>{
            res.json({results: deletedAuthor})
        })
        .catch(err=>{
            res.json({err:err})
        })
}

