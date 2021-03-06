# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    validates :username, :email, :password_digest, :session_token, presence: true
    validates :username, :email, :session_token, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }

    attr_reader :password

    after_initialize :ensure_session_token

    has_one_attached :avatar

    has_many :posts
    has_many :liked_posts, through: :posts, source: :likes

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user and user.validate_password?(password)
        user
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def validate_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64(16)
        self.save!
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64(16)
    end

end
