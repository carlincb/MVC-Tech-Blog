var commentBtn = $('.comment-btn');
var commentText;

commentBtn.click(function(){
    commentText = $(this).parent().siblings('textarea').val();
    console.log(commentText);
    var blogId = $("#blogForm").attr("data-id");
    console.log(blogId);
    commentAppendSpot = $(this).parent().parent();

    $.ajax({
        url: '/api/comments',
        dataType: 'json',
        type: 'POST',
        data: {
            "post_id": parseInt(blogId),
            "commentContent": commentText,
            "date_created": new Date()
    },
        

        success: function(){
            console.log('Comment added successfully');
        },

        error: function(){
         //   alert("There was an error sending your comment. Please try again later.");
        }
    });
});
