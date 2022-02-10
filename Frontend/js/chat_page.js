/**
 * to do:
 * 
 * display covid stats for state at top of page
 * maybe have a "show more info" option to display more specific stats
 * show previous comments, including:
 *      name
 *      date/time posted
 *      comment
 *      town/city??
 * empty textbox/"post comment" option to add new comment
 */

function showMore()
{
    var more_stats = document.getElementById("more_stats");
    var button = document.getElementById("hidetext");
    if (more_stats.style.display == "none") 
    {
        more_stats.style.display = "block";
        button.innerHTML = "Show less";
    } 
    else 
    {
        more_stats.style.display = "none";
        button.innerHTML = "Show more";
    }
}

function displayNewComment()
{
    console.log('in displayNewComment');
    var commentText = document.getElementById("new_comment").innerHTML;

    // document.getElementById("new_comment").value = ''; // clear textbox input

    // this is not working right
    //if ($.trim($(commentText).val()) == "")
    //if(commentText.replace(/^s+|s+$/g,) == "")
    ///if(commentText.match(/^ *$/) !== null)
    //if(commentText.trim() === "")
    if(commentText == "") // account for all white space entires too if you can figure it out!!
    {
        alert("Please enter text to post a comment.");
    }
    else
    {
        var newPost = `<div class="list-group-item">
                        <h6>username??</h6>
                        <p>${commentText}</p>
                    </div>`;
        document.getElementById("past_comments").innerHTML += newPost;
    }

    document.getElementById("new_comment").value = ''; // clear textbox input
}