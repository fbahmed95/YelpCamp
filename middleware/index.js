var Campground = require("../models/campground");
var Comment = require("../models/comments");
// all middleware 
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Campground not found");
               res.redirect("back");
           } else {
               //does user own campground?
               if(foundCampground.author.id.equals(req.user._id)){
                    next();
               } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
               }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               req.flash("error", "You do not have authorization to do that!");
               res.redirect("back");
           } else {
               //does user own comment?
               if(foundComment.author.id.equals(req.user._id)){
                    next();
               } else {
                    res.redirect("back");
               }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;