class Api::PostsController < ApplicationController

    def index
        if params.has_key?(:user_id)
            @posts = Post.where(user_id: params[:user_id])
        else
            @posts = Post.all
        end
    end

    # why do we return all posts?

    def create
        # here we go
        @post = Post.new(post_params)
        if @post.save
            # @posts = Post.all
            # render "api/posts/index"
            render "api/posts/show"
        else
            render json: @post.errors.full_messages, status: 422
        end
    end

    def show
        # if :user
        #     @posts_by_user = Post.where(user_id: user)

        #     if @posts_by_user
        #         render "api/posts/show"
        #     else
        #         render json: ["user or posts not found"], status: 422
        #     end
        # else

        @post = Post.find(params[:id])
        if @post
            render "api/posts/show"
        else
            render json: ["post not found"], status: 422
        end
    end

    def edit
    end

    def destroy
        @post = Post.find(params[:id])
        if @post.delete and @post.user.id == @post.user_id
            render "api/posts/show"
        else
            render json: ["post could not be deleted"], status: 422
        end
    end

    private

    def post_params
        params.require(:post).permit(:header, :body, :user_id, :post_type, :image)
    end

end
