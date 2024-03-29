"""update deal box

Revision ID: ef3d337195cf
Revises: 7f69edf4e8d0
Create Date: 2024-02-15 12:30:33.813621

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef3d337195cf'
down_revision = '7f69edf4e8d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('deal_box', schema=None) as batch_op:
        batch_op.add_column(sa.Column('cashflow_low', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('cashflow_high', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('ask_price_low', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('ask_price_high', sa.Float(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('deal_box', schema=None) as batch_op:
        batch_op.drop_column('ask_price_high')
        batch_op.drop_column('ask_price_low')
        batch_op.drop_column('cashflow_high')
        batch_op.drop_column('cashflow_low')

    # ### end Alembic commands ###
