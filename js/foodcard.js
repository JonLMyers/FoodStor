function initLoadCards(){
    loadSkeletons();
    var src = "https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?dpr=1&auto=compress,format&fit=crop&w=1920&h=&q=80&cs=tinysrgb&crop=";
    var avatar_src = "https://i.imgsafe.org/a4/a4bb9acc5e.jpeg";
    var recipie_title = "Magic Sauce";
    var numberStars = "69";
    var textMetadata = "This is a recipie for some magic sauce.  It is the best sauce.  It is S A L T Y.  It is also sweet.  Finally... It is SPICY. SALTY. SWEET. SAUCE.  Thanku pls upvote. ";
    
    var col1 = buildCardColumn(src, avatar_src, recipie_title, numberStars, textMetadata);
    var col2 = buildCardColumn(src, avatar_src, recipie_title, numberStars, textMetadata);
    var col3 = buildCardColumn(src, avatar_src, recipie_title, numberStars, textMetadata);
    $("#skely").empty();
    $("#skely").remove();
    $("#skely").empty();
    $("#skely").remove();
    $("#skely").empty();
    $("#skely").remove();
    $("#coly").append(col1);
    $("#coly").append(col2);
    $("#coly").append(col3);
    return 0;
}

function buildCardColumn(src, avatar_src, recipie_title, numberStars, textMetadata){
    var rawImage = $("<img>").attr("src", src);
    var figure = $("<figure>").addClass("image").append(rawImage);
    var image = $("<div>").addClass("card-image").append(figure);
    image.attr("alt", "Image");
    
    var rawAvatar = $("<img>").attr("src", avatar_src);
    rawAvatar.attr("alt", "Image");
    var avatarFigure = $("<figure>").addClass("image is-96x96").append(rawAvatar);
    var avatarMediaLeft = $("<div>").addClass("media-left").append(avatarFigure);
    var avatarMedia = $("<div>").addClass("media").append(avatarMediaLeft);

    var title = $("<p>").addClass("title is-4 no-padding");
    title.append(recipie_title);
    var stars = $("<p>").addClass("title is-6");
    stars.append("Stars: " + numberStars);
    var metaData = $("<div>").addClass("media-content").append(title);
    metaData.append(stars);
    avatarMedia.append(metaData);

    var textStub = $("<div>").addClass("content").append(textMetadata);
    
    var cardContent = $("<div>").addClass("card-content").append(avatarMedia);
    cardContent.append(textStub);
    var card = $("<div>").addClass("card large").append(image);
    card.append(cardContent);
    var column = $("<div>").addClass("column is-one-third").append(card);
    column.append(card);
    return column;
}

function buildSkeletonColumn(){
    var skeletonAvatar = $("<div>").addClass("skeleton-avatar");
    var skeletonAuthor= $("<div>").addClass("skeleton-author");
    var skeletonLabel = $("<div>").addClass("skeleton-label");
    var skeletonContent1 = $("<div>").addClass("skeleton-content-1");
    var skeletonContent2 = $("<div>").addClass("skeleton-content-2");
    var skeletonContent3 = $("<div>").addClass("skeleton-content-3");
    var skeletonContent4 = $("<div>").addClass("skeleton-content-4");
    var skeletonContent5 = $("<div>").addClass("skeleton-content-5");
    var skeletonContent6 = $("<div>").addClass("skeleton-content-6");
    var SkeletonWrapperBody = $("<div>").addClass("skeleton-wrapper-body").append(skeletonAvatar);
    SkeletonWrapperBody.append(skeletonAuthor);
    SkeletonWrapperBody.append(skeletonLabel);
    SkeletonWrapperBody.append(skeletonContent1);
    SkeletonWrapperBody.append(skeletonContent2);
    SkeletonWrapperBody.append(skeletonContent3);
    SkeletonWrapperBody.append(skeletonContent4);
    SkeletonWrapperBody.append(skeletonContent5);
    SkeletonWrapperBody.append(skeletonContent6);
    var skeletonImage = $("<div>").addClass("skeleton-image");
    var skeletonWrapperImage = $("<div>").addClass("skeleton-wrapper-image").append(skeletonImage);
    var skeletonWrapper = $("<div>").addClass("skeleton-wrapper").append(skeletonWrapperImage);
    skeletonWrapper.append(SkeletonWrapperBody);
    var card = $("<div>").addClass("card large").append(skeletonWrapper);
    var column = $("<div>").addClass("column is-one-third").append(card);
    column.attr("id", "skely");
    return column
}

function loadSkeletons(){
    $("#skely").empty();
    $("#skely").remove();
    $("#skely").empty();
    $("#skely").remove();
    $("#skely").empty();
    $("#skely").remove();
    var skeleton1 = buildSkeletonColumn();
    var skeleton2 = buildSkeletonColumn();
    var skeleton3 = buildSkeletonColumn();
    $("#coly").append(skeleton1);
    $("#coly").append(skeleton2);
    $("#coly").append(skeleton3);
    return 0;
}

function updateCards(){
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        var src = "https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?dpr=1&auto=compress,format&fit=crop&w=1920&h=&q=80&cs=tinysrgb&crop=";
        var avatar_src = "https://i.imgsafe.org/a4/a4bb9acc5e.jpeg";
        var recipie_title = "Magic Sauce";
        var numberStars = "69";
        var textMetadata = "This is a recipie for some magic sauce.  It is the best sauce.  It is S A L T Y.  It is also sweet.  Finally... It is SPICY. SALTY. SWEET. SAUCE.  Thanku pls upvote. ";
        var col1 = buildCardColumn(src, avatar_src, recipie_title, numberStars, textMetadata);
        var col2 = buildCardColumn(src, avatar_src, recipie_title, numberStars, textMetadata);
        var col3 = buildCardColumn(src, avatar_src, recipie_title, numberStars, textMetadata);
        $("#coly").append(col1);
        $("#coly").append(col2);
        $("#coly").append(col3);
        loadSkeletons();
    }
    return 0;
}
window.onload = initLoadCards;
window.addEventListener("scroll", updateCards);