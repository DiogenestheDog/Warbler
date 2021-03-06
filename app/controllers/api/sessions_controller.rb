class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )
        if @user
            login(@user)
            render "api/users/show"
        else
            render json: ["Invalid password/username"], status: 422
        end
    end

    def destroy
        @user = current_user
        if @user
            logout
            render json: {}
        else
            render json: ["but nobody is signed in..."], status: 418
        end
    end

end
